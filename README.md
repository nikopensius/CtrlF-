# CtrlF+ Extension

The CtrlF+ extension is a browser extension designed for the latest version of Chrome. It allows users to search for text sections that contain specified keywords, without case sensitivity or the need to pay attention to word form or inflections.

The CtrlF+ extension is currently optimized for use in English language Wikipedia.

## Installation

To install the CtrlF+ extension, follow these steps:

1. Download the extension package from the [CtrlF+ GitHub repository](https://github.com/nikopensius/CtrlF-).
You can do this by clicking on the green `Code` button and then clicking on `Download ZIP` in the dropdown box.
2. Extract the content of the ZIP file to a directory of your choosing. Extracting it to the Downloads directory will do fine.
3. Make sure the extracted file is named "CtrlF-". E.g not "CtrlF--main", and rename it to "CtrlF-" if needed.
4. Open your browser's extension management page. On Chrome, you can do this by entering `chrome://extensions/` into the browser's address bar.
5. Enable "Developer mode" if not already enabled.
6. Click on "Load unpacked" or "Load extension" and select the downloaded extension package.
7. The CtrlF+ extension will be installed and ready to use.

Please note that the CtrlF+ extension has been developed and tested for the latest version of Chrome.

## Backend Server

To run the CtrlF+ backend server, please follow these steps:

1. Ensure latest Python is installed on your device. You can install it from the [Python website](https://www.python.org) or Microsoft Store.
2. Open a PowerShell window with administrator privileges.
3. Run the command `python --version` to check if python is installed. If succesful, the console should print the current version of Python installed on your device.
4. Run the command `Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope Process` to enable running scripts.
5. Run the command `cd .\Downloads\CtrlF--main\CtrlF--main\` to navigate to the project directory.
6. Run the command `.\ctrlf\Scripts\activate` to activate the python virtual environment. When prompted, enter `r` to approve running environment. 
7. Run the command `python Python\backend.py` to run the Python backend application. 
8. Once you're done using the extension, to close the backend application, press `Ctrl+C` in the PowerShell window where the backend is running.
9. To exit the virtual environment, type `deactivate`. After that, you can close the PowerShell window.

## Usage

1. Press `Ctrl+Shift+F` to open the CtrlF+ find bar. No additional configuration is required.
2. Enter your search query in the input field. (Keywords can be separated by spaces and/or commas.)
3. Press `Enter` to start the search.
4. Use the navigation buttons to move through the search results.
5. Press `Esc` or click on the `X`-button again to close the CtrlF+ find bar.

## Security and Privacy

CtrlF+ is committed to ensuring user security and privacy. Although input sanitization is not currently implemented, it will be added in future updates.

## Contact

For support, questions, or general inquiries, please contact gustavnikopensius@gmail.com. A website for CtrlF+ will be launched soon to provide more information about the extension.

Thank you for your interest in CtrlF+!
