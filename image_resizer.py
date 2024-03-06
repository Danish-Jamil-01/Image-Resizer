import cv2
import glob
import os

inputfolder = 'Images'

os.makedirs('Resized Images', exist_ok=True)
i = 0

for img in glob.glob(inputfolder + "/*.*"):
    image = cv2.imread(img)
    imgResized = cv2.resize(image, (500, 400))
    cv2.imwrite("Resized Images/Image - %i.jpg" % (i+1), imgResized)
    i += 1
    cv2.imshow('image', imgResized)
    cv2.waitKey(1000)

cv2.destroyAllWindows()