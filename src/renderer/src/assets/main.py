from PIL import Image, ImageOps, ImageDraw
print('ran')

border_radius = 15
padding = 25
scale = 1
bg_scale = 6

screenshot = Image.open("test.png")
bg = Image.open("bg.jpg")
bg = bg.resize((round(bg.width / bg_scale), round(bg.height / bg_scale)))
loaded_ss = screenshot.load()

def most_frequent(List):
    counter = 0
    element = List[0]
     
    for i in List:
        curr_frequency = List.count(i)
        if(curr_frequency> counter):
            counter = curr_frequency
            element = i
 
    return element


sides = []

for i in range(2):
    colors = []
    for j in range(screenshot.width):
        colors.append(loaded_ss[j, i * screenshot.height - i])
    color = most_frequent(colors)

    diff_colors_l = []
    diff_colors_r = []
    for j in range(screenshot.height):
        for k in range(screenshot.width):
            if loaded_ss[k, j] != color:
                diff_colors_l.append((k, j))
            if loaded_ss[screenshot.width - k - 1, screenshot.height - j - 1] != color:
                diff_colors_r.append((screenshot.width - k, screenshot.height - j))
                

    for i in range(diff_colors_l.__len__()):
        if i == 0:
            closest_color_l = diff_colors_l[i]

        if diff_colors_l[i][0] < closest_color_l[0]:
            closest_color_l = diff_colors_l[i]
    
    for i in range(diff_colors_r.__len__()):
        if i == 0:
            closest_color_r = diff_colors_r[i]

        if diff_colors_r[i][0] > closest_color_r[0]:
            closest_color_r = diff_colors_r[i]


    sides.append(most_frequent(colors))

for i in range(2):
    colors = []
    for j in range(screenshot.height):
        colors.append(loaded_ss[i * screenshot.width - i, j])
    sides.append(most_frequent(colors))

    diff_colors_t = []
    diff_colors_b = []
    for j in range(screenshot.width):
        for k in range(screenshot.height):
            if loaded_ss[j, k] != color:
                diff_colors_t.append((j, k))
            if loaded_ss[screenshot.width - j - 1, screenshot.height - k - 1] != color:
                diff_colors_b.append((screenshot.width - j, screenshot.height - k))

    for i in range(diff_colors_t.__len__()):
        if i == 0:
            closest_color_t = diff_colors_t[i]

        if diff_colors_t[i][1] < closest_color_t[1]:
            closest_color_t = diff_colors_t[i]
    
    for i in range(diff_colors_b.__len__()):
        if i == 0:
            closest_color_b = diff_colors_b[i]

        if diff_colors_b[i][1] > closest_color_b[1]:
            closest_color_b = diff_colors_b[i]

border = most_frequent(sides)

screenshot = screenshot.crop([closest_color_l[0], closest_color_t[1], closest_color_r[0], closest_color_b[1]])

screenshot.show()
    