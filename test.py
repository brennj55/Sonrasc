import cv2
from sys import argv

def readImage(fileName):
    "Reads in an image in greyscale format."
    return cv2.imread(fileName, 0)

def displayImage(image):
    "Resizes the image and displays on screen."
    image = cv2.resize(image, (0, 0), fx = 0.3, fy = 0.3)
    cv2.namedWindow("Image", cv2.WINDOW_NORMAL)
    cv2.imshow("Image", image)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def thresholdImage(image):
    "Adative Thresh Gaussian threshold"
    return cv2.adaptiveThreshold(image,254,cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY,11,2)

image = thresholdImage(readImage(argv[1]))
displayImage(image)
