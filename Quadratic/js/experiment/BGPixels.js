var BGPixels = function(x, y, w, h, size)
{
    this.x = x;
    this.y = y;
    this.size = size || 1;
    this.w = w;
    this.h = h;
    //this.perlin = new Math2.ImprovedNoise();
    //this.color = fw.createColorRange('#c81ca3', '#16bcd1', 10);
    this.color = fw.createColorRange('#dddddd', '#333333', 10);
    this.a = Math.random();
    this.loop = {
        size : w * h,
        x : 0,
        y : 0
    };
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.context = this.canvas.getContext('2d');
};

BGPixels.prototype =
{
    generate: function()
    {
        for(var i=this.x, j; i<this.w; i+= this.size)
        {
            for(j=this.y; j<this.h; j+= this.size)
            {
                this.context.fillStyle = fw.randValueFromArray(this.color);
                this.context.fillRect(i, j, this.size, this.size);
            }
        }
        return this.canvas.toDataURL('image/png');
        /*for(var i=0; i< this.loop.size; i+=this.size)
        {
            this.loop.x = i % this.w;
            this.loop.y = ~~(i/this.w);
            var color = Math.abs(this.perlin.noise(this.loop.x, this.loop.y, this.a) * 1.2) * 255;
            var nimporteQuoi = 'rgb(' + ~~color + ', ' + ~~color + ', ' + ~~color + ')';
            //console.log(nimporteQuoi);
            c.fillStyle = nimporteQuoi;//fw.randValueFromArray(this.color);
            c.fillRect(this.loop.x, this.loop.y*this.size, this.size, this.size);
        }*/
    }
};