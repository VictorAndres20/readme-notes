# Kivy GUI Framework for Python applications
Kivy
Developed By: Kivy Organization
Website Link: https://kivy.org
Kivy Tutorial: https://www.youtube.com/watch?v=bMHK6NDVlCM&list=PLzMcBGfZo4-kSJVMyYeOQ8CXJ3z1k7gHn

------------------------------------------------------------------------------------------------------------------------------------------------------------

## Installation
**See https://kivy.org**
```
python -m pip install "kivy[base]" 
```

May be
```
python -m pip install "kivy[full]" 
```
------------------------------------------------------------------------------------------------------------------------------------------------------------

## Basic Usage
```
from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.gridlayout import GridLayout
from kivy.uix.label import Label
from kivy.uix.textinput import TextInput


def send_event(text_input: TextInput):
    print('HI: ', text_input.text)
    text_input.text = ''


class FormPanel(GridLayout):
    def __init__(self, **kwargs):
        super(FormPanel, self).__init__(**kwargs)
        self.cols = 2
        self.nameLabel = Label(text='Name: ')
        self.nameTextInput = TextInput(multiline=False)
        self.build()

    def build(self):
        self.add_widget(self.nameLabel)
        self.add_widget(self.nameTextInput)

    def get_name_input(self) -> TextInput:
        return self.nameTextInput


class GridPanel(GridLayout):
    def __init__(self, **kwargs):
        super(GridPanel, self).__init__(**kwargs)
        self.cols = 1
        self.form = FormPanel()
        self.sendBtn = Button(text='SEND', font_size=40)
        self.sendBtn.bind(on_press=lambda x: send_event(self.form.get_name_input()))
        self.build()

    def build(self):
        self.add_widget(self.form)
        self.add_widget(self.sendBtn)


class GuiApp(App):
    def build(self):
        return GridPanel()


if __name__ == '__main__':
    GuiApp().run()

```

------------------------------------------------------------------------------------------------------------------------------------------------------------

## Layout with .kv files

1. Python code looks like
```
from kivy.app import App
from kivy.uix.widget import Widget
from kivy.properties import ObjectProperty


class GridPanel(Widget):
    nameTextInput = ObjectProperty(None)

    def send_event(self):
        print('HI: ', self.nameTextInput.text)
        self.nameTextInput.text = ''


class GuiApp(App):
    def build(self):
        return GridPanel()


if __name__ == '__main__':
    GuiApp().run()
```

2. .kv file needs to be just **next to GuiApp class file** and name it 'gui.kv'
```
<GridPanel>:
    nameTextInput: nameTextInput

    GridLayout:
        cols: 1
        size: root.width, root.height
        GridLayout:
            cols: 2
            Label:
                text: "Name: "
            TextInput:
                id: nameTextInput
                multiline: False
        Button:
            text: "SEND"
            on_press: root.send_event()
```

------------------------------------------------------------------------------------------------------------------------------------------------------------

## Layout with .kv files example of menu sub and side

1. Python code looks like
```
from kivy.app import App
from kivy.uix.floatlayout import FloatLayout
from kivy.properties import ObjectProperty


class FloatPanel(FloatLayout):
    nameTextInput = ObjectProperty(None)

    def send_event(self):
        print('HI: ', self.nameTextInput.text)
        self.nameTextInput.text = ''


class GuiApp(App):
    def build(self):
        return FloatPanel()


if __name__ == '__main__':
    GuiApp().run()

```

2. .kv file needs to be just **next to GuiApp class file** and name it 'gui.kv'
```
<FloatPanel>:

    GridLayout:
        cols: 1
        pos_hint: {"x": 0, "top": 1}
        size_hint: 0.1, 0.3
        Button:
            id: btn_menu_1
            size_hint: 1, 0.1
            color: (0.3, 0.4, 0.5, 1) if btn_menu_1.state == "normal" else (200, 200, 200, 1)
            background_color: (200, 200, 200, 1) if btn_menu_1.state == "normal" else (0, 0, 0, 1)
            text: "MENU 1"
        Button:
            size_hint: 1, 0.1
            color: 0.3, 0.4, 0.5, 1
            background_color: 200, 200, 200, 1
            text: "MENU 2"
        Button:
            size_hint: 1, 0.1
            color: 0.3, 0.4, 0.5, 1
            background_color: 200, 200, 200, 1
            text: "MENU 3"

    GridLayout:
        pos_hint: {"x": 0.1, "top": 1}
        size_hint: 0.9, 0.1
        cols: 3
        Button:
            id: btn_sup_menu_1
            color: (0.3, 0.4, 0.5, 1) if btn_sup_menu_1.state == "normal" else (200, 200, 200, 1)
            background_color: (200, 200, 200, 1) if btn_sup_menu_1.state == "normal" else (0, 0, 0, 1)
            text: "SUB MENU 1"
        Button:
            color: 0.3, 0.4, 0.5, 1
            background_color: 200, 200, 200, 1
            text: "SUB MENU 2"
        Button:
            color: 0.3, 0.4, 0.5, 1
            background_color: 200, 200, 200, 1
            text: "SUB MENU 3"

    FloatLayout:
        pos_hint: {"x": -0.28, "top": 1.33}
        size_hint: 1, 1
        Label:
            pos_hint: {"x": 0, "top": 1}
            text: "Hello world"
```

------------------------------------------------------------------------------------------------------------------------------------------------------------

## Layout with .kv files example of moving between screens with alert (popup)

1. Python code looks like
```
from kivy.app import App
from kivy.properties import ObjectProperty
from kivy.lang import Builder
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.popup import Popup


class Alert(FloatLayout):
    textAlert = ObjectProperty(None)


def show_popup(screen: Alert, message: str):
    screen.textAlert.text = message
    Popup(title="TITLE", content=screen, size_hint=(None, None), size=(400, 400)).open()


class MainWindow(Screen):
    nameTextInput = ObjectProperty(None)

    def send_event(self):
        print('HI: ', self.nameTextInput.text)
        if self.nameTextInput.text == 'viti':
            self.nameTextInput.text = ''
            return True
        else:
            show_popup(Alert(), 'Name is not good')
            return False


class SecondWindow(Screen):
    pass


class WindowManager(ScreenManager):
    pass


class GuiApp(App):
    def build(self):
        return Builder.load_file('gui.kv')
	//return Builder.load_file(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gui.kv'))


if __name__ == '__main__':
    GuiApp().run()
```

2. .kv file needs to be just **next to GuiApp class file** and name it 'gui.kv'
```
<Alert>:
    textAlert: textAlert
    Label:
        id: textAlert
        pos_hint: {"x": 0, "top": 1}


WindowManager:
    MainWindow:
    SecondWindow:

<MainWindow>:
    name: "mainWindow"

    nameTextInput: nameTextInput

    FloatLayout:
        pos_hint: {"x": 0, "top": 1}
        size_hint: 1, 1
        GridLayout:
            cols: 1
            pos_hint: {"x": 0, "top": 1}
            size_hint: 0.1, 0.3
            Button:
                id: btn_menu_1
                size_hint: 1, 0.1
                color: (0.3, 0.4, 0.5, 1) if btn_menu_1.state == "normal" else (200, 200, 200, 1)
                background_color: (200, 200, 200, 1) if btn_menu_1.state == "normal" else (0, 0, 0, 1)
                text: "MENU 1"
            Button:
                size_hint: 1, 0.1
                color: 0.3, 0.4, 0.5, 1
                background_color: 200, 200, 200, 1
                text: "MENU 2"
            Button:
                size_hint: 1, 0.1
                color: 0.3, 0.4, 0.5, 1
                background_color: 200, 200, 200, 1
                text: "MENU 3"

        GridLayout:
            pos_hint: {"x": 0.1, "top": 1}
            size_hint: 0.9, 0.1
            cols: 3
            Button:
                id: btn_sup_menu_1
                color: (0.3, 0.4, 0.5, 1) if btn_sup_menu_1.state == "normal" else (200, 200, 200, 1)
                background_color: (200, 200, 200, 1) if btn_sup_menu_1.state == "normal" else (0, 0, 0, 1)
                text: "SUB MENU 1"
            Button:
                color: 0.3, 0.4, 0.5, 1
                background_color: 200, 200, 200, 1
                text: "SUB MENU 2"
            Button:
                color: 0.3, 0.4, 0.5, 1
                background_color: 200, 200, 200, 1
                text: "SUB MENU 3"

        FloatLayout:
            pos_hint: {"x": 0.1, "top": 0.9}
            size_hint: 0.9, 0.9
            GridLayout:
                pos_hint: {"x": 0, "top": 1}
                size_hint: 1, 0.1
                cols: 3
                Label:
                    text: "name: "
                TextInput:
                    id: nameTextInput
                Button:
                    text: "SEND"
                    size_hint: 1, 0.1
                    on_release:
                        app.root.current = "secondWindow" if root.send_event() == True else "mainWindow"
                        root.manager.transition.direction = "left"

<SecondWindow>:
    name: "secondWindow"
    Button:
        text: "Go back"
        on_release:
            app.root.current = "mainWindow"
            root.manager.transition.direction = "right"
```


------------------------------------------------------------------------------------------------------------------------------------------------------------

# Use kivy.factory import Factory to register Classes that need to be loaded in kv files

```
from kivy.app import App
from kivy.factory import Factory
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager
import os

from src.gui.windows.main_window import MainWindow
from src.gui.windows.second_window import SecondWindow


class WindowManager(ScreenManager):
    pass


Factory.register('MainWindow', cls=MainWindow)
Factory.register('SecondWindow', cls=SecondWindow)
Factory.register('WindowManager', cls=WindowManager)


class GuiApp(App):
    def build(self):
        return Builder.load_file(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gui.kv'))

```

------------------------------------------------------------------------------------------------------------------------------------------------------------

# Looping in kv files
https://gist.github.com/tshirtman/4088021

```
from kivy.app import App
from kivy.lang import Builder
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.button import Button
from kivy.properties import ObjectProperty
from kivy.factory import Factory

kv = '''
MyWidget:
    box: box
    BoxLayout:
        id: box
'''


class MyWidget(FloatLayout):
    box = ObjectProperty(None)

    def on_box(self, *args):
        for i in range(5):
            self.box.add_widget(Button(text=str(i)))

Factory.register('MyWidget', cls=MyWidget)


class LoopApp(App):
    def build(self):
        return Builder.load_string(kv)


LoopApp().run()
```

------------------------------------------------------------------------------------------------------------------------------------------------------------
