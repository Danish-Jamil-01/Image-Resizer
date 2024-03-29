# Image Resizing with OpenCV 
<br>This Python script utilizes the OpenCV library to resize images in a specified folder and saves the resized images in a new directory. It's particularly useful for batch resizing images.

<br>

## Prerequisites
 - Python 3.x

 - OpenCV (pip install opencv-python) 

<br>

## Usage
<ol>

<li>Clone the repository to your local machine:
 <br>
 
 ```bash
git clone https://github.com/Danish-Jamil-01/Image-Resizer.git
```
</li>
<br>


<li>Navigate to the directory containing the script:
 <br> 
 
 ```bash
cd Image-Resizer
```
</li>
<br>

<li>Ensure your images are placed in the Images folder.</li>

<br>

<li>Run the script:
<br>

 ```bash
python image_resizer.py
```
</li>

<br>

<li>Resized images will be saved in the Resized Images folder.</li>
</ol>

<br>

## Customization

- You can modify the dimensions of the resized images by changing the parameters in the <b>'cv2.resize()'</b> function.

- Adjust the input folder name (<b>'Images'</b>) and output folder name (<b>'Resized Images'</b>) as per your requirements.

<br>

## License

This project is licensed under the [MIT License](LICENSE).
