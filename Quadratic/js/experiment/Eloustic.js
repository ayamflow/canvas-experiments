var Eloustic = function(x, density, width, startColor, endColor)
{
    this.density = density + 2;
    this.startColor = startColor;
    this.endColor = endColor;
    this.width = width;
    this.xPos = x;
    this.distortX = 750;
    this.distortY = 750;
    this.inertiaX = 0.1;
    this.inertiaY = 0.1;
};

Eloustic.prototype =
{
    init: function()
    {
        this.points = [];
        for(var i=0; i<this.density; i++)
        {
            this.points[i] = {x: this.xPos, y: (i-2)*50, ox: this.xPos, oy: (i-2)*50};
        }
    },

    animate: function(c, mx, my)
    {
        c.lineWidth = this.width;
        var gradient = c.createLinearGradient(0, screenHeight>>1, screenWidth, screenHeight>>1);
        gradient.addColorStop(0.3, this.startColor);
        gradient.addColorStop(0.7, this.endColor);
        c.strokeStyle = gradient;

        c.beginPath();

        c.moveTo(this.points[0].x, this.points[0].y);
        var i, xc, yc, p, theta, distortX, distortY;

        for(i=1, xc, yc; i<this.density-2; i++)
        {
            p = this.points[i];
            theta = Math.atan2(p.y - my, p.x - mx);
            //thanks to Tim Holman for distort calculation http://codepen.io/tholman/pen/Jochj
            distortX = this.distortX / Math.sqrt((mx - p.x) * (mx - p.x) + (my - p.y) * (my - p.y));
            distortY = this.distortY / Math.sqrt((mx - p.x) * (mx - p.x) + (my - p.y) * (my - p.y));
            p.x += Math.cos(theta) * distortX + (p.ox - p.x) * this.inertiaX;
            p.y += Math.sin(theta) * distortY + (p.oy - p.y) * this.inertiaY;
            xc = (p.x + this.points[i+1].x) / 2;
            yc = (p.y + this.points[i+1].y) / 2;
            c.quadraticCurveTo(p.x, p.y, xc, yc);
        }
        c.quadraticCurveTo(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);

        c.stroke();
        c.closePath();
    }
};