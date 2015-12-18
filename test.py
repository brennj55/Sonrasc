import cv2
import os.path
import numpy
from sys import argv

def read(fileName):
    "Reads in an image in greyscale format."
    if not os.path.exists(fileName):
        raise IOError("File not found.")
    return cv2.imread(fileName, 0)

def display(image):
    "Resizes the image and displays on screen."
    image = cv2.resize(image, (0, 0), fx = 0.3, fy = 0.3)
    cv2.namedWindow("Image", cv2.WINDOW_NORMAL)
    cv2.imshow("Image", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def threshold(image):
    "Adative Thresh Gaussian threshold"
    #return cv2.adaptiveThreshold(image,256,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)
    return cv2.threshold(image, 150, 255, cv2.THRESH_BINARY_INV, 11)

def dilate(image):
    kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
    display(cv2.dilate(image, kernel, iterations = 13))

def contour(image):
    return cv2.findContours(image, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)[1]

_, image = threshold(read(argv[1]))
contours = contour(image)

for contour in contours:
    [x, y, w, h] = cv2.boundingRect(contour)
    if h > 5 and w > 5:
        cv2.rectangle(image, (x, y), (x+w, y+h), (255, 0, 255), 2)

display(image)
