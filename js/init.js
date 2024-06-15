window.addEventListener('load', function() {
    loading.style.display = 'none';
    const overworld = new Overworld({
        element: gameContainer
    });
    overworld.init();

});
