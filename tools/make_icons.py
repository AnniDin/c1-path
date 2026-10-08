"""Draws the app icons (icons/icon-192.png, icon-512.png, icon-maskable-512.png) with Pillow.  python tools/make_icons.py"""
import os
from PIL import Image, ImageDraw, ImageFont

here = os.path.dirname(os.path.abspath(__file__))
out = os.path.join(here, '..', 'icons')
BG, FG = (11, 61, 145), (255, 255, 255)
FONTS = ['C:/Windows/Fonts/arialbd.ttf', '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf']

def font(size):
    for f in FONTS:
        if os.path.exists(f):
            return ImageFont.truetype(f, size)
    return ImageFont.load_default()

def icon(size, maskable):
    img = Image.new('RGBA', (size, size), BG + (255,) if maskable else (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if not maskable:
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=size // 12, fill=BG)
    f = font(int(size * (0.34 if maskable else 0.47)))  # maskable keeps the text inside the central safe zone
    d.text((size / 2, size / 2), 'C1', font=f, fill=FG, anchor='mm')
    return img

for name, size, mask in [('icon-192.png', 192, False), ('icon-512.png', 512, False), ('icon-maskable-512.png', 512, True)]:
    icon(size, mask).save(os.path.join(out, name))
print('ok')
