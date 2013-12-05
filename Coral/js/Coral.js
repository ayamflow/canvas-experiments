var Coral = function(context, posX, posY)
{
	this.context = context;

	this.trunkHeight = fw.rand(100, 150) * 0.5;
	this.angle = fw.rand(10, 50);
	this.reduction = fw.rand(0.4, 0.67);
	this.thickness = fw.rand(40, 100);

	this.start = {
		x: posX,
		y: posY,
		angle : 90
	};

	this.startPoints = [];
	this.startPoints.push(this.start);

	this.context.globalCompositeOperation = "lighter";
	this.colors = fw.createColorRange(fw.randColor(), fw.randColor(), 40);
	this.draw();
};

Coral.prototype.draw = function()
{
	this.trunkHeight = ~~(this.trunkHeight * 0.7);
	if(this.trunkHeight < 20) return;
	this.thickness *= this.reduction;
	this.context.lineWidth = this.thickness;
	var branchStartPoints = [];
	this.context.beginPath();

	var occurences = ~~(fw.rand(4, 6));

	var start, endPoints = [];
	for(var i = 0, l = this.startPoints.length; i < l; i++)
	{
		start = this.startPoints[i];

		for(var j = 0; j < occurences; j++)
		{
			endPoints[j] = this.getEndPoint(start.x, start.y, start.angle + this.angle, this.trunkHeight);

			this.context.moveTo(start.x, start.y);
			this.context.lineTo(endPoints[j].x, endPoints[j].y);

			endPoints[j].angle = start.angle - this.angle;

			branchStartPoints.push(endPoints[j]);

			this.angle += (380 - 90) / (occurences-1);

			var index = ~~(	this.trunkHeight / this.colors.length),
				color = this.colors[index];
			this.context.strokeStyle = color;
		}
	}

	this.context.stroke();
	this.startPoints = branchStartPoints;

	if(this.trunkHeight > 2)
	{
		setTimeout(this.draw.bind(this), 100);
	}
};

Coral.prototype.getEndPoint = function(x, y, angle, length)
{
	var endX = x + length * Math.cos(angle*Math.PI/180),
		endY = y + length * Math.sin(angle*Math.PI/180);
		return {x: endX, y: endY};
};