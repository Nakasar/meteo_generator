import random
from tkinter import *

## Map
def generateMap(height, width) :
    return [[0 for i in range(width)] for j in range(height)]

def resetMap(map, probabilityOfRain) :
    for i in range(len(map)) :
        for j in range(len(map[i])) :
            if random.random() > probabilityOfRain :
                map[i][j] = 1
            else :
                map[i][j] = 0
            
    return map

def countRainyAround(map, x, y) :
    rainyCount = 0
    for i in range(-1, 2) :
        for j in range(-1, 2) :
            if (x+i >= 0 and y+j >= 0 and x+i < len(map) and y+j < len(map[y])) :
                if map[x+i][y+j] == 1 :
                    rainyCount = rainyCount + 1
    
    return rainyCount

def step(map, thresholdDeath, thresholdLife) :
    nextMap = [[0 for i in range(len(map[j]))] for j in range(len(map))]
    
    for x in range(len(map)) :
        for y in range(len(map[x])) :
            rainyCount = countRainyAround(map, x, y)
            if map[x][y] == 1 :
                if rainyCount < thresholdDeath :
                    nextMap[x][y] = 0
                else :
                    nextMap[x][y] = 1
            else :
                if rainyCount >= thresholdLife :
                    nextMap[x][y] = 1
                else :
                    nextMap[x][y] = 0
                    
    return nextMap

def computeCellsState(map) :
    processedMap = [[0 for i in range(len(map[j]))] for j in range(len(map))]
    for x in range(len(map)) :
        for y in range(len(map[x])) :
            rainyCount = countRainyAround(map, x, y)
            
            if rainyCount == 0 :
                processedMap[x][y] = 0 #sunny
            elif rainyCount >= 8 :
                processedMap[x][y] = 3 #rainy
            elif rainyCount > 4 :
                processedMap[x][y] = 2 # grey
            else :
                processedMap[x][y] = 1
    return processedMap

def addOneDay(map) :
    newMap = [[0 for i in range(len(map[j]))] for j in range(len(map))]
    
    for x in range(1, len(map) - 1) :
        for y in range(1, len(map[x]) - 1) :
            dx = random.randrange(-1, 2)
            dy = random.randrange(-1, 2)
            newMap[x + dx][y + dy] = map[x][y] 
    
    return newMap
            
## drawing
def drawMap(canvas, map, pixelSize) :
    for i in range(len(map)) :
        for j in range(len(map[i])) :
            # Compute color
            if map[i][j] == 0 :
                color = "lightblue"
            elif map[i][j] == 1 :
                color = "lightgrey"
            elif map[i][j] == 2 :
                color = "grey"
            elif map[i][j] == 3 :
                color = "blue"
            else :
                color = "white"
            
            canvas.create_rectangle(i * pixelSize - pixelSize / 2, j * pixelSize - pixelSize / 2, i * pixelSize + pixelSize / 2, j * pixelSize + pixelSize / 2, outline =color, fill=color)
            
    return
    

## test
width = 200
height = 100

## Interface

def stepClicked() :
    global pixelSize
    global mapCanvas
    global map
    map = step(map, 7, 7)
    for id in mapCanvas.find_all() :
        mapCanvas.delete(id)
    drawMap(mapCanvas, computeCellsState(map), pixelSize)

def generateClicked() :
    global pixelSize
    global mapCanvas
    global map
    map = generateMap(width, height)
    map = resetMap(map, 0.3)
    map = step(map, 7, 7)
    map = step(map, 7, 7)
    drawMap(mapCanvas, computeCellsState(map), pixelSize)

def dayClicked() :
    global pixelSize
    global mapCanvas
    global map
    map = addOneDay(map)
    for id in mapCanvas.find_all() :
        mapCanvas.delete(id)
    drawMap(mapCanvas, computeCellsState(map), pixelSize)

pixelSize = 5
window = Tk()

mapCanvas = Canvas(window, width=width*pixelSize, height=height*pixelSize, background="white")
mapCanvas.pack()

quitButton = Button(window, text="Quit", command=window.destroy)
quitButton.pack()

resetButton = Button(window, text="Generate", command=generateClicked)
resetButton.pack()

stepButton = Button(window, text="Iterate", command=stepClicked)
stepButton.pack()

dayButton = Button(window, text="Next Day", command=dayClicked)
dayButton.pack()

legend = Canvas(window, width=90, height = 80, background="white")
legend.create_rectangle(0, 0, 20, 20, fill="lightblue")
legend.create_text(25, 10, text="Soleil", anchor="w")
legend.create_rectangle(0, 20, 20, 40, fill="lightgrey")
legend.create_text(25, 30, text="Nuages", anchor="w")
legend.create_rectangle(0, 40, 20, 60, fill="grey")
legend.create_text(25, 50, text="Ciel couvert", anchor="w")
legend.create_rectangle(0, 60, 20, 80, fill="blue")
legend.create_text(25, 70, text="Pluie", anchor="w")
legend.pack()

window.mainloop()
