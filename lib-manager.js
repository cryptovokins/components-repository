const inquirer = require('inquirer');
const Subject = require('rxjs').Subject;
const util = require('util');
const spinner = require('loading-spinner');
const exec = require('child_process').exec;

const INITIAL_OPTIONS = 'initialOptions';
const LIBRARY_NAME = 'libraryName';
const OPTION_CREATE_LIBRARY = 'Create a new library';
const OPTION_LOCAL_LIBRARY = 'Publish the library for local use'

const questionInitialOptions = {
  type: 'list',
  name: INITIAL_OPTIONS,
  message: 'Choose one action: ',
  default: 0,
  choices: [OPTION_CREATE_LIBRARY, OPTION_LOCAL_LIBRARY]
};

const questionLibraryName = {
  type: 'input',
  name: LIBRARY_NAME,
  message: 'Introduce the library name'
}

const prompts = new Subject();
const execPromise = util.promisify(exec);
const prefix = process.env.LIBRARY_PREFIX || 'md';
const libraryPath = process.env.D_LIBRARY_PATH || '$HOME/.dlibraries';

function createLibrary (name) {
  spinner.start(100, {
    clearChar: true
  });
  execPromise(`ng generate library ${name} --prefix ${prefix}`)
  .then(() => {
    spinner.stop();
    console.log(`Library created in ./projects/${name}`);
    prompts.complete();
  })
  .catch(error => {
    spinner.stop();
    console.error('The library creation has failed', error);
    prompts.error(error);
  });
}

function runAction(action) {
  switch(action) {
    case OPTION_CREATE_LIBRARY: 
      prompts.next(questionLibraryName)
    break;
  }
}

function onEachAnswer({name, answer}) {
  switch(name) {
    case LIBRARY_NAME:
      createLibrary(answer);
    break;
    case INITIAL_OPTIONS:
      runAction(answer);
    break;
  }
}

function onError(error) {
  throw error;
}

function onComplete() {
  console.log('END');
}

inquirer
.prompt(prompts)
.ui.process.subscribe(onEachAnswer, onError, onComplete);

prompts.next(questionInitialOptions);
