var Tree = function(context, startX)
{
	this.context = context;

	this.trunkHeight = 50 + Math.random()*150;
	this.angle = Math.random()*50 + 10;
	this.reduction = fw.rand(0.65, 0.74);
	this.thickness = Math.random()*30 + 10;

	this.start = {
		x: startX,
		y: this.trunkHeight,
		angle : 90
	};

	this.startPoints = [];
	this.startPoints.push(this.start);

	this.trunkColors = fw.createColorRange(fw.randColor(), fw.randColor(), 7);
	this.colors = fw.createColorRange(fw.randColor(), fw.randColor(), 10);

	//this.trunkColors = fw.createColorRange('#754215', '#307515', 7);
	//this.colors = fw.createColorRange('#C92910', '#C0C910', 20);

	this.gradient = this.context.createLinearGradient(screenWidth/2, screenWidth/2, screenHeight, 0);
	this.gradient.addColorStop(0, this.trunkColors[0]);
	this.gradient.addColorStop(1, this.trunkColors[6]);

	//this.drawBG();
	this.drawTrunk();
	this.drawBranches();
};

Tree.prototype.drawBG = function()
{
	this.context.save();
	var background = this.context.createRadialGradient(screenWidth/2 + screenWidth/4, 200, 100, screenWidth/2, 200, 600);
	background.addColorStop(0, '#f0630a');
	background.addColorStop(1, '#1f0f3e');
	this.context.fillStyle = background;
	this.context.fillRect(0, 0, screenWidth, screenHeight);
	this.context.restore();
};

Tree.prototype.drawTrunk = function()
{
	this.context.save();
	this.context.beginPath();
	this.context.moveTo(this.start.x, screenHeight);
	this.context.lineTo(this.start.x, screenHeight - this.start.y);
	this.context.strokeStyle = this.gradient;
	this.context.lineWidth = this.thickness;
	this.context.stroke();
	this.context.restore();
};

Tree.prototype.drawBranches = function()
{
	this.trunkHeight *= this.reduction;
	this.thickness *= this.reduction;
	this.context.lineWidth = this.thickness;
	var branchStartPoints = [];
	this.context.beginPath();

	var start, leftEndPoint, rightEndPoint;
	for(var i = 0, l = this.startPoints.length; i < l; i++)
	{
		start = this.startPoints[i];
		leftEndPoint = this.getEndPoint(start.x, start.y, start.angle + this.angle, this.trunkHeight);
		rightEndPoint = this.getEndPoint(start.x, start.y, start.angle - this.angle, this.trunkHeight);

		this.context.moveTo(start.x, screenHeight - start.y);
		this.context.lineTo(leftEndPoint.x, screenHeight - leftEndPoint.y);
		this.context.moveTo(start.x, screenHeight - start.y);
		this.context.lineTo(rightEndPoint.x, screenHeight - rightEndPoint.y);

		leftEndPoint.angle = start.angle + this.angle;
		rightEndPoint.angle = start.angle - this.angle;

		branchStartPoints.push(leftEndPoint);
		branchStartPoints.push(rightEndPoint);
	}

	if(this.trunkHeight < 20)
	{
		this.context.strokeStyle = this.colors[~~this.trunkHeight];
		//this.context.strokeStyle = 'rgba(200,200,200,0.6)';
	}
	else
	{
		//var color = ~~(this.trunkHeight/100 *10);
		this.context.strokeStyle = this.gradient;//this.trunkColors[color];
	}

	this.context.stroke();
	this.startPoints = branchStartPoints;

	if(this.trunkHeight > 2)
	{
		setTimeout(this.drawBranches.bind(this), 50);
	}
};

Tree.prototype.getEndPoint = function(x, y, angle, length)
{
	var endX = x + length * Math.cos(angle*Math.PI/180),
		endY = y + length * Math.sin(angle*Math.PI/180);
		return {x: endX, y: endY};
};