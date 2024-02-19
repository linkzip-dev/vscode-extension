# LinkZip Extension

## Overview

LinkZip Extension is a Visual Studio Code extension designed to streamline the deployment process of static content packaged within a zip archive to LinkZip services. With its intuitive interface, developers can effortlessly package and deploy their web assets, ensuring rapid and efficient delivery to LinkZip's hosting platform. Simplify your deployment workflow and accelerate your development cycle with LinkZip Extension.

## Features

- **Init Project**: Initialize a new project for deployment.
- **Deploy Project**: Deploy the current project to LinkZip.
- **Configure LinkZip**: Configure API token for LinkZip services.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the square icon in the sidebar.
3. Search for "LinkZip Extension".
4. Click Install to install the extension.

## Usage

1. Configure LinkZip:

   - Open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on macOS) or click on the status bar item "LinkZip: Configure"
   - Type "LinkZip: Configure" and press Enter.
   - Enter your API token when prompted and press Enter.

![Configure LinkZip](https://raw.githubusercontent.com/linkzip-dev/vscode-extension/main/images/configure.gif)

2. Init Project:

   - Open the Command Palette or click on the status bar item "LinkZip: Init Project".
   - Type "LinkZip: Init Project" and press Enter.
   - Follow the prompts to initialize a new project for deployment.

![Init Project](https://raw.githubusercontent.com/linkzip-dev/vscode-extension/main/images/init.gif)

3. Deploy Project:
   - Open the Command Palette or click on the status bar item "LinkZip: Deploy Build".
   - Type "LinkZip: Deploy Project" and press Enter.
   - Wait for the deployment process to complete.

![Deploy](https://raw.githubusercontent.com/linkzip-dev/vscode-extension/main/images/deploy.gif)

## Supported Commands

- `linkzip.init`: Initialize a new project for deployment.
- `linkzip.deploy`: Deploy the current project to LinkZip.
- `linkzip.configure`: Configure API token for LinkZip services.

## Contribution

Contributions are welcome! If you encounter any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request on [GitHub repository](https://github.com/linkzip-dev/vscode-extension).

## License

MIT License

Copyright (c) 2024 [LinkZip](https://linkzip.dev)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
