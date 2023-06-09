# CtrlF+ Extension

The CtrlF+ extension is a browser extension designed for the latest version of Chrome. It allows users to search for text sections that contain specified keywords, without case sensitivity or the need to pay attention to word form or inflections.

The CtrlF+ extension is currently optimized for use in English language Wikipedia.

## Installation

To install the CtrlF+ extension, follow these steps:

1. Download the extension package from the [CtrlF+ GitHub repository](https://github.com/nikopensius/CtrlF-).
You can do this by clicking on the green `Code` button and then clicking on `Download ZIP` in the dropdown box.
2. Extract the content of the ZIP file. Use the default dictionary for extraction.
3. If all is done correctly, the Downloads directory should contain a `CtrlF--main` folder, which in turn contains another, inner `CtrlF--main` folder.
4. Open your browser's extension management page. On Chrome, you can do this by entering `chrome://extensions/` into the browser's address bar.
5. Enable "Developer mode" if not already enabled.
6. Click on "Load unpacked" or "Load extension" and select the extracted extension package. This is the inner `CtrlF--main` folder.
7. The CtrlF+ extension will be installed and ready to use.

Please note that the CtrlF+ extension has been developed and tested for the latest version of Chrome.

## Backend Server

To run the CtrlF+ backend server, please follow these steps:

1. Ensure latest Python is installed on your device. You can install it from **Microsoft Store** or from the [Python website](https://www.python.org). Or use a quick link for [macOS](https://www.python.org/ftp/python/3.11.3/python-3.11.3-macos11.pkg) or [Windows](https://www.python.org/ftp/python/3.11.3/python-3.11.3-amd64.exe) that downloads the Python 3.11.3 installer, dated April 5, 2023.
3. Open a PowerShell window with administrator privileges.
4. Run the command `python --version` to check if python is installed. If succesful, the console should print the current version of Python installed on your device.
5. Run the command `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process` to enable running scripts.
6. Run the command `cd .\Downloads\CtrlF--main\CtrlF--main\` to navigate to the project directory.
7. Run the command `.\ctrlf\Scripts\activate` to activate the python virtual environment. When prompted, enter `r` to approve running environment. 
8. Run the command `python Python\backend.py` to run the Python backend application. Ignore the warning.
9. The backend server is running and ready to use.
10. Once you're done using the extension, to close the backend, press `Ctrl+C` in the PowerShell window where the backend is running.
11. To exit the virtual environment, run the command `deactivate`. After that, you can close the PowerShell window.

## Usage

1. Make sure you've installed the extension and that the backend server is running.
2. In Chrome, press `Ctrl+Shift+F` to open the CtrlF+ find bar. No additional configuration is required.
3. Enter your search query in the input field. (Keywords can be separated by spaces and/or commas.)
4. Press `Enter` to start the search.
5. Use the navigation buttons to move through the search results.
6. Press `Esc` or click on the `X`-button again to close the CtrlF+ find bar.

## Security and Privacy

CtrlF+ is committed to ensuring user security and privacy. Although input sanitization is not currently implemented, it will be added in future updates.

## Contact

For support, questions, or general inquiries, please contact gustavnikopensius@gmail.com. A website for CtrlF+ will be launched soon to provide more information about the extension.

Thank you for your interest in CtrlF+!
