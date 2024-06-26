class Example extends Phaser.Scene
{
    helpText;
    objectToPlace = 'platform';
    map;
    marker;
    tileBlocker = 21;
    preload ()
    {
        // We load the images
        this.load.image('tiles', 'assets/platformer_tiles.png');  
        this.load.image('car', 'assets/car90.png');
    }

    create ()
    {
        // tileWidth and tileheight is the width/height in pixels of the tile, it is imporant for the tileset we want to use
        // width/height is the number of tiles that the map will have        
        this.map = this.make.tilemap({ tileWidth: 16, tileHeight: 16, width: 25, height: 20});      
        // we add the tileset to the map, since the tilewidth/height is already defined on the map, the tileset will be divided in
        // 16x16 chunks
        const tiles = this.map.addTilesetImage('tiles');
        const layer = this.map.createBlankLayer('layer1', tiles);
        // since the tileset is 16x16 pixels we will scale it x2 so they will appear as 32x32
        layer.setScale(2);
        //I will  fill the borders so the car cannot pass
        //I will do it wall by wall so i can learn better
        //TOP WALL
        layer.fill(this.tileBlocker,0, 0, 25, 1)
        //BOTTOM WALL
        layer.fill(this.tileBlocker,0, 18, 25, 1)
        //LEFT WALL
        layer.fill(this.tileBlocker,0, 1, 1, 17)
        //RIGHT WALL
        layer.fill(this.tileBlocker,24, 1, 1, 17)
        // in the Fill the first number is the number of the tileSET, second and third is x,y the start of the fill 
        //last number is the number of fills that i want
        layer.fill(59, 1, 13, 23, 1); // Surface of the water
        layer.fill(77, 1, 14, 23, 4); // Body of the water
        layer.randomize(1, 1, 23, 12, [ 44, 45, 46, 47, 48 ]); // Wall above the water 

        const player = this.add.image(32 + 16, 32 + 16, 'car');

        //  Left
        this.input.keyboard.on('keydown-A', event =>
        {

            const tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

            if (tile.index === this.tileBlocker)
            {
                //  Blocked, we can't move
            }
            else
            {
                player.x -= 32;
                player.angle = 180;
            }

        });

        //  Right
        this.input.keyboard.on('keydown-D', event =>
        {

            const tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

            if (tile.index === this.tileBlocker)
            {
                //  Blocked, we can't move
            }
            else
            {
                player.x += 32;
                player.angle = 0;
            }

        });

        //  Up
        this.input.keyboard.on('keydown-W', event =>
        {

            const tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

            if (tile.index === this.tileBlocker)
            {
                //  Blocked, we can't move
            }
            else
            {
                player.y -= 32;
                player.angle = -90;
            }

        });

        //  Down
        this.input.keyboard.on('keydown-S', event =>
        {

            const tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

            if (tile.index === this.tileBlocker)
            {
                //  Blocked, we can't move
            }
            else
            {
                player.y += 32;
                player.angle = 90;
            }

        });

        this.add.text(8, 8, 'Usa AWSD para moverte', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#000000'
        });
        this.add.text(8, 585, 'Estas paredes no se pueden atravesar', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#000000'
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 610,
    scene: Example,
    pixelArt: true
};

const game = new Phaser.Game(config);