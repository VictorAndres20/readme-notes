# pip install Pillow
from PIL import Image

input_path = "/Users/vic/Documents/vipeti_nbg_v4.png"
output_path = "/Users/vic/Documents/vipeti_nbg_v4_py.png"
new_color = "#6c7ae0"

img = Image.open(input_path).convert("RGBA")

# Convert hex to RGB
new_color = new_color.lstrip('#')
r, g, b = tuple(int(new_color[i:i + 2], 16) for i in (0, 2, 4))

pixels = img.load()
width, height = img.size

for y in range(height):
    for x in range(width):
        r_val, g_val, b_val, a_val = pixels[x, y]

        # Check alpha channel - if alpha > 0, pixel is visible (has content)
        # if alpha == 0, pixel is transparent (no background/no content)
        if a_val > 0:  # This pixel has content
            pixels[x, y] = (r, g, b, a_val)  # Change color, keep transparency level
        # if a_val == 0, we skip it (transparent background stays transparent)

img.save(output_path)
print(f"Image saved to {output_path}")
