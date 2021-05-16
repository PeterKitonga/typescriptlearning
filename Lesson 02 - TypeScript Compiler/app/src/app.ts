const button = document.querySelector('button');

const clickHandler = (message: string) => {
    console.log(`'Click Me' button clicked...${message}`);
}

if (button) {
    button.addEventListener('click', clickHandler.bind(null, `Great!`));
}