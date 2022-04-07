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
**https://kivy.org/doc/stable/guide/lang.html**

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

# Include external .kv files inside .kv file

0. Imagine this structure
project-root
|-- main.py
|-- test.kv
`-- gui/
    `-- tab_test.kv

1. External tab_test.kv file
```
<ButtonInclude@Button>:
    button_include: button_include

    id: button_include
    text: 'button include'
    on_press: app.root.print_obj(self)  # "app.root.method"Execute the RootWidget method from within the external Kv file with
```

2. Include in test.kv file
```
#:include gui/tab_test.kv  #Import an external Kv file

<RootWidget>:
    # button_Define include as a property of RootWidget
    button_include: tab_button_include.button_include

    TabbedPanel:
        do_default_tab: False
        
        TabbedPanelItem:
            text: 'Tab1'
            BoxLayout:
                Button:
                    text: 'button 1'
                    on_press: root.print_obj(self)
                Button:
                    text: 'button 2'
                    on_press: root.check_button_include()
        TabbedPanelItem:
            text: 'Tab2'
            ButtonInclude:  #Use the widget class defined in the external Kv file
                id: tab_button_include  #Assign id to the defined widget class
```

------------------------------------------------------------------------------------------------------------------------------------------------------------

# Structure for Kivy application

- src/app/controllers/
- src/app/services/
- src/app/models/
- src/gui/windows/
- src/gui/windows/main_window.py
- src/gui/windows/SecondWindow.py
- src/gui/widgets/
- src/gui/widgets/alert.py
- src/gui/kv/
- src/gui/kv/modules/
- src/gui/kv/containers/
- src/gui/gui_app.py
- src/gui/gui.kv
- main.py

1. src/app
This will located all logic for application

2. src/gui/windows/
Locate all modules for gui frontend

Example main_window.py
```
from kivy.properties import ObjectProperty
from kivy.uix.screenmanager import Screen

from src.gui.widgets.alerts.alert import show_popup, Alert


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

```

Example second_window.py
```
from kivy.uix.screenmanager import Screen


class SecondWindow(Screen):
    pass

```

3. src/gui/widgets/
Locate all Widgets that can be in modules

Example alert.py
```
from kivy.properties import ObjectProperty
from kivy.uix.floatlayout import FloatLayout
from kivy.uix.popup import Popup


class Alert(FloatLayout):
    textAlert = ObjectProperty(None)


def show_popup(screen: Alert, message: str):
    screen.textAlert.text = message
    Popup(title="TITLE", content=screen, size_hint=(None, None), size=(400, 400)).open()

```

4. src/gui/widgets/kv/
Locate all kv files for modules

Example conatiners/alert.kv
```
<Alert>:
    textAlert: textAlert
    Label:
        id: textAlert
        pos_hint: {"x": 0, "top": 1}
```

Example modules/main_window.kv
```
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
```

Example modules/second_window.kv
```
<SecondWindow>:
    name: "secondWindow"
    Button:
        text: "Go back"
        on_release:
            app.root.current = "mainWindow"
            root.manager.transition.direction = "right"
```

5. src/gui/gui_app.py
Create WindowManager, register and load all kv files with classes

```
from kivy.app import App
from kivy.factory import Factory
from kivy.lang import Builder
from kivy.uix.screenmanager import ScreenManager
from kivy.config import Config
import os

from src.gui.windows.main_window import MainWindow
from src.gui.windows.second_window import SecondWindow


Config.set('graphics', 'width', '600')
Config.set('graphics', 'height', '600')


class WindowManager(ScreenManager):
    pass


Factory.register('MainWindow', cls=MainWindow)
Factory.register('SecondWindow', cls=SecondWindow)
Factory.register('WindowManager', cls=WindowManager)


class GuiApp(App):
    def build(self):
        return Builder.load_file(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gui.kv'))

```

6. src/gui/gui.kv
Root kv file for application

```
#:include src/gui/kv/containers/alert.kv
#:include src/gui/kv/modules/main_window.kv
#:include src/gui/kv/modules/second_window.kv

WindowManager:
    MainWindow:
    SecondWindow:
```

7. main.py

```
from src.gui.gui_app import GuiApp

if __name__ == '__main__':
    GuiApp().run()

```

------------------------------------------------------------------------------------------------------------------------------------------------------------

# ScrollView and GridLayout
Add 
```
size_hint_y: None
height: self.minimum_height
```
in GridLyaout

```
ScrollView:
    do_scroll_x: False
    do_scroll_y: True
    GridLayout:
        size_hint_y: None
        height: self.minimum_height
        cols: 1
        on_parent:
            for i in range(100): txt = "Label {0}".format(i); self.add_widget(Label(text = txt, size_hint_y=None, height=20,
            text_size=(self.width, None), padding=(10, 10), color=(1,1,1,1)))
```
------------------------------------------------------------------------------------------------------------------------------------------------------------

# Clean and re build widgets in Layout
self.[IDLAYOUT].clear_widgets()
self.[IDLAYOUT].add_widget()

1. Python
```
from kivy.properties import ObjectProperty
from kivy.uix.label import Label
from kivy.uix.screenmanager import Screen
from kivy.uix.popup import Popup

import os

from src.app.controllers.reader_controller import ReaderController
from src.gui.widgets.file_chooser.file_chooser import LoadFileDialog


class MainWindow(Screen):

    listLayout = ObjectProperty(None)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.readerController = ReaderController()
        content = LoadFileDialog(load=self.load_event, cancel=self.dismiss_popup)
        self._popup = Popup(title="Load file", content=content,
                            size_hint=(0.9, 0.9))

    def dismiss_popup(self):
        self._popup.dismiss()

    def show_file_load(self):
        self._popup.open()

    def load_event(self, path, filename):
        df = self.readerController.read_file(os.path.join(path, filename[0]))
        print(df.head())
        self.listLayout.clear_widgets()
        for index, row in df.iterrows():
            print(row['uuid'])
            self.listLayout.add_widget(Label(text='NUEVO {}'.format(row['id']), size_hint=(1, None), height=20,
                                             text_size=(self.width, None), padding=(10, 10),))
        self.dismiss_popup()

``` 

2. kv file
```
#:include src/gui/kv/containers/load_file_dialog.kv
#:import Label kivy.uix.label.Label

<MainWindow>:
    name: "mainWindow"

    listLayout: listLayout

    BoxLayout:
        orientation: 'vertical'
        ScrollView:
            do_scroll_x: False
            do_scroll_y: True
            GridLayout:
                id: listLayout
                size_hint_y: None
                height: self.minimum_height
                cols: 1
        BoxLayout:
            orientation: 'vertical'
            size_hint_y: None
            height: 30
            Button:
                text: 'Cargar plano'
                on_release: root.show_file_load()
```

------------------------------------------------------------------------------------------------------------------------------------------------------------

# Controll switch windows in Python code

```
import kivy
kivy.require('1.10.1')
from kivy.app import App
from kivy.properties import ObjectProperty
from kivy.uix.textinput import TextInput
from kivy.lang.builder import Builder
from kivy.uix.scrollview import ScrollView
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.screenmanager import ScreenManager, Screen

class MainScreen(Screen):
    pass
class FirstScreen(Screen):
    container=ObjectProperty(None)
    def add_buttons(self):
        self.ButtonList=[1,2,3,4,5,6,7,8,9,10]
        for i in range(0,10):
            self.ButtonList[i]=Button(text='Button {}'.format(i), id=str(i), size_hint=(1,None), on_press=self.switchscreens)
            self.container.add_widget(self.ButtonList[i])
    def switchscreens(self,instance):
        self.container.clear_widgets()
        self.manager.current='secondscreen'
class SecondScreen(Screen):
    container=ObjectProperty(None)
    def add_labels(self):
        self.LabelList=[1,2,3,4,5,6,7,8,9,10]
        for i in range(0,10):
            self.LabelList[i]=Label(text='Label {}'.format(i), id=str(i), size_hint=(1,None))
            self.container.add_widget(self.LabelList[i])
        self.SwitchBackButton=Button(text='Main Screen', id='switchbutton', size_hint=(1,None), height=30, on_press=self.switchback)
        self.container.add_widget(self.SwitchBackButton)
    def switchback(self,instance):
        ScrollView.scroll_y=1
        self.container.clear_widgets()
        self.manager.current='main'
class ScreenManagement(ScreenManager):
    pass
presentation=Builder.load_file("Switch.kv")
class SwitchApp(App):
    def build(self):
        return presentation
SwitchApp().run()
```

kv
```
ScreenManagement:
    name:'screen_manager'
    id:screenmanager
    MainScreen:
    FirstScreen:
        on_pre_enter:
            self.add_buttons()
    SecondScreen:
        on_pre_enter:
            self.add_labels()

<MainScreen>:
    id:main_screen
    name: 'main'
    ScrollView:
        id:scrollview
        name:'scrollview'
        GridLayout:
            cols:1
            padding:10
            spacing:10
            size_hint: None, None
            width:800
            height: self.minimum_height
            Label:
                text: 'Main Menu'
            Button:
                text: 'First Screen'
                size_hint: 1,None
                on_release: app.root.current= 'firstscreen'


<FirstScreen>:
    id:first_screen
    name: 'firstscreen'
    container:container
    ScrollView:
        id:scrollview
        name:'scrollview'
        GridLayout:
            id:container
            cols:1
            padding:10
            spacing:10
            size_hint: None, None
            width:800
            height: self.minimum_height

<SecondScreen>:
    id:second_screen
    name: 'secondscreen'
    container:container
    ScrollView:
        id:scrollview
        name:'scrollview'
        GridLayout:
            id:container
            cols:1
            padding:10
            spacing:10
            size_hint: None, None
            width:800
            height: self.minimum_height
```

------------------------------------------------------------------------------------------------------------------------------------------------------------

# Window size
https://stackoverflow.com/questions/14014955/kivy-how-to-change-window-size


Before the window is created:
```
import kivy
kivy.require('1.9.0')

from kivy.config import Config
Config.set('graphics', 'width', '200')
Config.set('graphics', 'height', '200')
```

Dynamically after the Window was created:
```
from kivy.core.window import Window
Window.size = (300, 100)
```

------------------------------------------------------------------------------------------------------------------------------------------------------------
