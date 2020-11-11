var fs = require('fs');

var template = `<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Simple Example</title>
</head>
<body>
	<div>
		<div><img src="{layer1}"></div>
		<div><img src="{layer2}"></div>
		<div><img src="{layer3}"></div>
		<div><img src="{layer4}"></div>
		<div><img src="{layer5}"></div>
		<div><img src="{layer6}"></div>
	</div>
</body>
</html>
`;

var myArgs = process.argv.slice(2);

var folder = myArgs[0];

fs.readdirSync(folder).forEach((file, i) => {
    var bitmap = fs.readFileSync(`${folder}/${file}`);
    var base64 = new Buffer(bitmap).toString('base64');
    template = template.replace(`{layer${i+1}}`, `data:image/png;base64, ${base64}`)
});

fs.writeFile("index.html", template, function (err) {
    if (err) return console.log(err);
    console.log('Success');
  });