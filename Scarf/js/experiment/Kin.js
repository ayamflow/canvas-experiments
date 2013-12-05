var Kin = function(x, y, width, height, color)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.color = color;

    this.theta = -Math.PI;
};

Kin.prototype = {
    update: function(c, circle)
    {
        circle ? this.drawCircle(c) : this.draw(c);
    },

    getPin: function()
    {
        return {
            x: this.x + Math.cos(this.theta) * this.width,
            y: this.y + Math.sin(this.theta) * this.width
        };
    },

    draw: function(c)
    {
        c.save();
        c.translate(this.x - (this.width>>1), this.y - (this.height>>1));
        c.rotate(this.theta);
        c.fillStyle = this.color;
        c.fillRect(0, 0, this.width, this.height);
        c.restore();
    },

    drawCircle: function(c)
    {
        c.save();
        c.translate(this.x - (this.width>>1), this.y - (this.height>>1));
        c.rotate(this.theta);
        c.fillStyle = this.color;
        c.beginPath();
        c.arc(0, 0, this.height>>1, 0, Math.PI*2, true);
        c.fill();
        c.restore();
    }
};