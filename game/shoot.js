var bulletTime1 = 0;
var bulletTime2 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

var bullet_enemy_material = new THREE.MeshLambertMaterial(
{
    color: 0xff0000, 
    transparent: false
});

function enemy1shoot()
{
    if (bulletTime2 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_enemy_material);
        scene.add(bullet);
        bullet.position.x = enemy1.position.x + 7.5 * Math.cos(enemy1.direction);
        bullet.position.y = enemy1.position.y + 7.5 * Math.sin(enemy1.direction);
        bullet.angle = enemy1.direction;
        enemy1.bullets.push(bullet);
        bulletTime2 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < enemy1.bullets.length; i++)
    {
        enemy1.bullets[i].position.x += moveDistance * Math.cos(enemy1.bullets[i].angle);
        enemy1.bullets[i].position.y += moveDistance * Math.sin(enemy1.bullets[i].angle);
    }
}

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
    }

}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        console.log(player1.bullets[i].position.x + " " + player1.bullets[i].position.y);
        console.log(enemy1.position)

        const diffx = Math.abs(player1.bullets[i].position.x - enemy1.position.x);
        const diffy = Math.abs(player1.bullets[i].position.y - enemy1.position.y);

        if (diffx < 10 && diffy < 10) {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
            enemy1.life = 1;
            enemy1.dead();
        }
        else if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }

    for (var i = 0; i < enemy1.bullets.length; i++)
    {
        console.log(enemy1.bullets[i].position.x + " " + enemy1.bullets[i].position.y);
        console.log(player1.position)

        const diffx = Math.abs(enemy1.bullets[i].position.x - player1.position.x);
        const diffy = Math.abs(enemy1.bullets[i].position.y - player1.position.y);

        if (diffx < 10 && diffy < 10) {
            scene.remove(enemy1.bullets[i]);
            enemy1.bullets.splice(i, 1);
            i--;
            player1.dead();
        }
        else if (Math.abs(enemy1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(enemy1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(enemy1.bullets[i]);
            enemy1.bullets.splice(i, 1);
            i--;
        }
    }

}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH )
        player1.graphic.position.x -= x - WIDTH;
    if ( y < 0 )
        player1.graphic.position.y -= y;
    if ( y > HEIGHT )
        player1.graphic.position.y -= y - HEIGHT;
    if ( x < 0 )
        player1.graphic.position.x -= x;

}

function player_falling()
{
    var nb_tile = 10;
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;
    var length = noGround.length;
    var element = null;

    for (var i = 0; i < length; i++) {
        element = noGround[i];

        if (element == null)
            continue;

        var tileX = (element[0] - sizeOfTileX / 2) | 0;
        var tileY = (element[1] - sizeOfTileY / 2) | 0;
        var mtileX = (element[0] + sizeOfTileX / 2) | 0;
        var mtileY = (element[1] + sizeOfTileY / 2) | 0;

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
            player1.position.x = 50;
            player1.position.y = 0;
            player1.graphic.position.x = 50;
            player1.graphic.position.y = 0;
           player1.dead();
        }
    }

}
