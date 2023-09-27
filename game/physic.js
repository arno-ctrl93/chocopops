function update()
{
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 50 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta * 2;   // pi/2 radians (90 degrees) per second

    if (keyboard.pressed("left"))
        player1.turnLeft(rotateAngle);
    if (keyboard.pressed("right"))
        player1.turnRight(rotateAngle);
    if (keyboard.pressed("up"))
        player1.accelerate(moveDistance);
    if (keyboard.pressed("down"))
        player1.decelerate(moveDistance);

    player1.move();
    console.log("Enemy Shoot")
    enemy1shoot();
    console.log("Move Auto Enemy")
    enemy1.moveAuto();
    //log position and graphic position
    if (player1.position.x != player1.graphic.position.x || player1.position.y != player1.graphic.position.y){
        console.log("position and graphic position are not the same");
        console.log(player1.position.x + " " + player1.position.y);
        console.log(player1.graphic.position.x + " " + player1.graphic.position.y);
    }
    controls.update();
}