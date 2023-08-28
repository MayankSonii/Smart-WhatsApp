# Smart-WhatsApp
---

## Description
Smart-WhatsApp is a chrome plugin which gives smart suggestions for a particular message using chatGPT chat completions API with GPT3.5-turbo model.

### Key Features
* Feature to **enable/disable** the plugin
* Offers a list of configurable settings
    * **Suggestions** - number of suggestions to get as a response
    * **Temperature** - sets the randomness of the suggestions
    * **TopP** - selects the top probabilty for suggestions
* Stores the suggestions that are already being sent by the backend in local storage 
* A dedicated backend for serving the request

### Technologies Used
* ReactJs
* Webpack
* NodeJs
* ExpressJs

---

## Installation
### Setup of Backend Server
* Install the dependencies
```bash
npm install
```
* Rename the **.env.sample** to **.env** and set the **API_KEY** with your own API key

### Setup of Plugin
* Goto plugin directory
```bash
cd plugin
```
* Install the dependencies
```bash
npm install
```
---

## Usage
### Backend Server
* Run the command to serve 
```bash
npm run server
```
### Plugin
* Goto plugin directory
```bash
cd plugin
```
* Build the plugin in development mode
```bash
npm run build
```
* Open the chrome extensions tab and enable the **developer mode** option
* Click on **load unpacked** button and then select the **build** directory in the **plugin** directory

### How to get Smart Suggestions?
* Goto WhatsApp web 
* Enable the plugin from the Smart-WhatsApp plugin popup
* Select your desired configuration, if any
* Click on the message for which you want to get the suggestions
* Wait for the suggestions to load 
* Copy the suggestion to the clipboard by clicking on the desired suggestion from the suggestion box popup

---
## Lisence
Licensed Under [MIT](license)





