var Ball = function(x, y, radius) {
    this.radius = radius;
    this.x = x;
    this.y = y;
};

Ball.prototype = {
    draw: function(context) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
};