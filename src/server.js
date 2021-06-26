const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { db } = require('./dbConfig');
// const { reset } = require('nodemon');
// const { errors } = require('pg-promise');
// const flash = require('express-flash');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/'));//This line is necessary for us to use relative paths and access our resources directory

app.get('/', (req, res) => {
	res.render('pages/game', {
		title: 'Game | Checkbox Snake'
	});
});

app.get('/scores', (req, res) => {
	const query = 'SELECT * FROM Games ORDER BY score DESC LIMIT 10;';
	// const avg_q = 'SELECT difficulty, ROUND(AVG(score), 2) FROM Games GROUP BY difficulty;';
	db.task('get-everything', task => {
		return task.batch([
			task.any(query),
			// task.any(avg_q)
		]);
	}).then(data => {
		res.render('pages/scores', {
			title: 'Scores | Checkbox Snake',
			top10Scores: data[0],
			// avgScores: data[1]
		});
	}).catch(err => {
		res.render('pages/game', {
			title: 'Game | Checkbox Snake'
		});
	});

	// db.any(query)
	// 	.then(data => {
	// 		res.render('pages/scores', {
	// 			title: 'Scores | Checkbox Snake',
	// 			data: data,
	// 		})
	// 	})
	// 	.catch(err => {
	// 		// req.flash('error', err);
	// 		res.render('pages/game', {
	// 			title: 'Game | Checkbox Snake',
	// 		})
	// 	})
});

app.get('/score-data/:difficulty', (req, res) => {
	const scoresQuery = `SELECT * FROM Games WHERE difficulty = '${req.params.difficulty}' ORDER BY score DESC;`;
	const highScoreQuery = `SELECT player, score, moves, time, date from Games WHERE difficulty = '${req.params.difficulty}' ORDER BY score DESC LIMIT 1;`;
	const avgsQuery = `SELECT ROUND(AVG(score), 2) AS avg_score, ROUND(AVG(time), 2) AS avg_time, ROUND(AVG(moves), 2) as avg_moves FROM Games WHERE difficulty = '${req.params.difficulty}';`;
	const gamesPlayedQuery = `SELECT COUNT(id) as games_played FROM Games WHERE difficulty = '${req.params.difficulty}';`;

	db.task('get-everything', task => {
		return task.batch([
			task.any(scoresQuery),
			task.any(highScoreQuery),
			task.any(avgsQuery),
			task.any(gamesPlayedQuery)
		]);
	}).then(data => {
		res.send({scores: data[0], highScore: data[1], avgs: data[2], gamesPlayed: data[3]});
	}).catch(err => {
		console.log(`Error: ${err}`);
		res.send(`Error: ${err}`);
	});
	
	// db.any(query)
	// 	.then(data => {
	// 		res.send(data);
	// 	})
	// 	.catch(err => {
	// 		console.log(`Error: ${err}`);
	// 		res.send(`Error: ${err}`);
	// 	});
});

app.post('/add_score', (req, res) => {
	console.log(req.body);
	const insert = `INSERT INTO Games (player, score, moves, difficulty, time, date) VALUES ('${req.body.player}', ${req.body.score}, ${req.body.moves}, '${req.body.difficulty}', ${req.body.time},  NOW())`;
	db.any(insert)
		.then(data => {
			res.redirect('/scores');
		}).catch(err => {
			// req.flash('error', err);
			res.redirect('/scores');
		});
})

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});