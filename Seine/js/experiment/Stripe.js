var Stripe = function(x, y, width, height, theta, color, mode) {
    this.x = x;
    this.y = y;
    this.theta = theta;
    this.color = color;
    this.mode = mode;

    if(this.mode == "water"){
        this.height = height;
        this.width = fw.dist(0, 0, screenWidth, screenHeight);
        //this.width = fw.dist(x, y, width, y + height/2);
    }
    else if(this.mode == "plasma") {
        this.width = width/20;
        this.height = height*2;//fw.dist(0, 0, screenWidth, screenHeight);//fw.dist(x, y, x + width/2, y + height);
    }
};

Stripe.prototype = {
    draw: function(c) {
        c.save();
        c.strokeStyle = this.color;
        c.lineWidth = this.height;
        c.translate(this.x, this.y);
        c.rotate(this.theta);
        c.beginPath();
        c.moveTo(0, 0);
        if(this.mode == "water") c.lineTo(this.width, this.y + this.height/2);
        else if(this.mode == "plasma") c.lineTo(this.x + this.width/2, this.height);
        c.stroke();
        c.restore();
    }
};