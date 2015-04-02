# The Mozu Base Blank Theme

The Mozu Base Blank Theme extends the Mozu Core6 Theme by default. This theme is a good starting point for Mozu theme development. For information on the Mozu Core Theme, refer to the [Mozu Core Theme repository](https://github.com/Mozu/core-theme).

## Build Tooling Requirements

This theme includes a set of build tools. These tools work on Windows 7 and later, Mac OSX 10.4 and later, and most modern Linux distros. To use them, here's what you need.

* [NodeJS](http://nodejs.org) > 0.10.0 
* [Git](http://git-scm.com/) or another command-line-based version control system if you want to control versioning with packages

## Install Bower Globally

Bower handles front-end dependencies (jquery, bootstrap, angular, etc). In your command window type the following:

```bash
  npm install -g bower
```

## Install Grunt Globally

You will also need to make sure you have the grunt command line tools if you don't have them already. These should be installed globally (-g flag) via your command window:

```bash
  npm install -g grunt-cli
```

## Node Packages (Dev Dependencies)

### This is on a per-project level

Clone or download these files into your local computer. Our typical folder structure for Mozu projects are C:\sites\mozu\projectname.com 

Before you can build the application, you must install all the npm dependencies from package.json. In your CMD cd into your project folder and run the following (make sure you have an existing package.json file):

```bash
  npm install
```

This will install the latest compatible grunt version under node_modules, along with several other dependencies. In some cases, I've found it's necessary to also run npm update:

```bash
  npm update
```

To install the Mozu build tools, run the following from a command line in your project folder:

```bash
  node configure.js
```

This command installs two global command line utilities, Grunt (for running build tasks) and Bower (for managing frontend packages). This command also installs local development dependencies for your theme in the `node_modules` folder, and the Core themes in the `references` folder.

You’re now ready to begin working on your Mozu theme.

## Initializing your local environment

First and foremost, let’s run a command that will keep the source code separate from the build files. This separation allows you from accidentally editing the build. Via your CMD, cd to your project folder and run the following command:

```bash
  grunt init
```

This task copies all of the stylesheets from /references/core6/stylesheets/ into your /stylesheets/ source folder. 

Next, note the /dev/ folder in the root of your project folder. Within this directory, you’ll notice the following paths:

* /css/
* /images/
* /js/

The /dev/css/ path will be where the LESS files concatenate into a style.css file to be used locally. 

>The /images/ and /js/ folders are optional. You can utilize the /images/ and /js/ folders when developing locally – but using the Mozu default /resources/ folder accomplishes the same thing more or less.

An annoying thing you’ll have to do for now is to remove all references of the {{themeSettings}} calls in your Less files. Thankfully, the only two files that contain these calls are /base/variables.less and /modules/page-header.less. If those references are still in, the Less files won’t be able to compile. I would make a copy of those files on your local CPU for future reference as once you’re done working locally you can utilize these theme settings again.

Now in your CMD, run the following command:

```bash
  grunt less
```

This will compile your LESS files into your /dev/css/style.css file. 

When coding, enable the grunt watch task – in your CMD run the following:

```bash
  grunt watch
```

If everything was setup correctly in the Gruntfile, the CMD should say:

```bash
  “Running ‘watch’ task
  Waiting…”
```

While Grunt is “watching”, when editing a .less stylesheet file, it should compile into the style.css file within the /dev/css/ folder.

The final thing to do is to launch a local webserver via Node.js and the http-server package. This serves your static files like HTML, CSS, and Javascript. In your CMD, cd to your root directory and run the following command:

```bash
  npm install -g http-server
```

When the installation is complete you can navigate to your website folder, for example type cd /sites/wwwroot/mozu/yourproject.com and type the following command:

```bash
  http-server
```

If installed correctly, you should see an output like this:

```bash
  Starting up http-server, serving ./ on: http://0.0.0.0:8080
  Hit CTRL-C to stop the server
```

You now have a local server running at http://localhost:8080.

Assuming you have an index.html page within your /dev/ folder, if you go to http://localhost:8080/dev/index.html you should see your page.

## Getting Started

Unfortunately, there’s not a true process down for developing themes locally in Mozu. 

There is a flat HTML page: /dev/index.html included with this package that is basically a screen scrape of the source code from the homepage of a Sandbox created in the Mozu Dev Center. All of the resources are pointing to your /dev/ path so feel free to start editing away.

Another option is to set up your regions, widgets, etc. on your template first and then do a screen scrape and edit that way assuming you have a Sandbox created in your Dev Center already prepared and you know the basics of Mozu theme development.

The only thing to note about the above is if you create a new flat .html page you’ll want to note to change the stylesheet location to your compiled version: /dev/css/style.css. Additionally, make sure you change the reference of the layout.css file to your local copy as well (/dev/css/layout.css).

That’s pretty much the bare bones overview of setting everything up locally and should be enough to point you in the right direction for now.

## Mozu Specific Information

1.  Create your new theme in the [Mozu Developer Center](https://developer.mozu.com/Console/theme). **The theme creation workflow in Dev Center no longer gives you a base blank theme to download. Instead, download a new copy of this theme (use the most current release in the [Releases](https://github.com/mozu/base-blank-theme/releases) tab).**

2.  Install the build tools by running the `node configure.js` command described in the [Build Tooling Requirements](#build-tooling-requirements) section.

3. Design your theme. If you're starting from scratch, begin by editing `theme.json` and setting the name of your new theme.

## Theme Development Best Practices

*   Use the `references/core6` directory as a reference. The theme you're building inherits from the Core6 base theme by default. For each file you discover you need to override, copy the Core6 version from your `references/core6` folder and into the corresponding location in your own theme. 

*   Use the `references/core4` and `references/core5` directory as references. If you're experienced building themes on Core4 or Core5, you can use the side-by-side Core directories to compare and contrast for relevant Core6 changes.

*   You should regularly synchronize your theme with the Mozu Dev Center. The build tools help you by automatically checking your scripts for common errors, then building a named and tagged zipfile for you to upload. If you have installed the build tools, the basic command you can run to do this is `grunt`.

## Command reference

All commands should be run from a command line (Terminal in OSX, Command Prompt in Windows) in the root directory of your theme.

### Install build tools
```bash
node configure.js
```

### Build theme into a zipfile, checking for errors and updates along the way
```bash
grunt
```
The name of the zipfile is taken from your `package.json` file. This file manages the build tools' dependencies on npm modules and establishes its identity as a "package". Therefore we use the name from this configuration as the filename for a generated zip. Unless you publish your theme to a package registry (which is not common), this name won't be used for any other purpose.

### Build and create a release with a synchronized version number across package.json, theme.json, etc
```bash
grunt release --to 1.2.3
```
Replace `1.2.3` with the desired version number.

### Update your references directory with released patches or updates to the Core themes
```bash
grunt updatereferences
```

### Add source control integration to your build process
```bash
grunt setup-vcs-tagging
```
This command configures your build system so that your zipfile names are appended with an abbreviation of the current Git commit hash. If you're not using Git source control, but your source control system has a command which would output a unique commit/changeset/version ID, then you can supply it to this command with the option `--tagcmd`.

```
grunt setup-vcs-tagging --tagcmd="hg id -i"
```
This command configures the build system so that zipfile names are appended with a Mercurial ID from a Mercurial repository instead of a Git repository.

**Note: This command can only be run safely once, since it modifies code in the Gruntfile. To make this change manually, look for the variable `versionCmd` inside your `Gruntfile.js` file.**

## Troubleshooting

Issue               | Platform | Suggestion
:------------------ | -------- |:---------
**Configure script fails with `EACCES` error on `/usr/local`** | OSX or Linux | If your `node configure.js` script fails on its first task (installing global Grunt), you may have a permissions issue installing global NPM modules. This is very common and a frequently advised solution is to run the install command with `sudo`. We advise instead to change the permissions appropriately on your global NPM module directory and cache, which by convention should not contain privileged files. Run `sudo chown -R $(whoami) $(npm prefix -g) && sudo chown -R $(whoami) $(npm get cache)` instead.
**Configure script fails on `updatereferences` task** | OSX or Linux | If your `node configure.js` script fails on its last task (running the `grunt updatereferences` task), you may not have Git installed. On OSX, your system may show a dialog suggesting that you install XCode to install Git. Installing XCode will work, though it takes a long time and is very large. You can also install the OSX git client directly, through http://git-scm.com/download/mac or through an OSX package manager like Homebrew.
**Configure script fails on `npm link bower` task** | Windows 7 | You're running an old version of the build scripts that used `npm link`, a command which requires administrator access in Windows 7. The current version of the build tools doesn't use this command!
**Configure script fails on `updatereferences` task** | Windows | If your `node configure.js` script fails on its last task (running the `grunt updatereferences` task), you may not have Git installed. Install Git for Windows using a Windows package manager like Chocolatey, or through the installer at http://git-scm.com.

