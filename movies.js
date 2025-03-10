import { error } from 'console';
import express from 'express';

const express = require("express")

const app = express();
const port = 3000;

app.use(express.json());

const movies = {

1:      {title: "Deadpool 3", director: "Shawn Levy", year: 2024, oscar: false},
2:      {title: "Titanic", director: "James Cameron", year: 1997, oscar: true},
3:      {title: "Mátrix", director: "Lana Wachowski", year: 1999, oscar: true }

};

app.get("/movies", (req, res) => {
    res.json(movies);
});

app.get("/movies/:id", (req, res => {
    const movie = movies[req.params.id];
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({error: "Movie not found"});
    }
}
));

app.post("movies", (req, res => {
    const {title, director, year, oscar} = req.body;

    if(!title || !director || !year || oscar === undefined){
        return res.status(400).json({error: "Missing required fields"});
    }

    const newID = Object.keys(movies).length+1;
    
    res.status(201).json({ id: newID, ...movies[newID]})
}))

app.put("movies/:id", (req, res => {
    const id = req.params.id;

    if(!movies[id]){
        return res.status(404).json({error: "Movie not found"});
    }

    const {title, director, year, oscar} = req.body;
    movies[id] = {title, director, year, oscar};

    res.json(movies[id])
}))

app.delete("movies/:id", (req, res => {
    const id = req.params.id;

    if(!movies[id]) {
        return res.status(404).json({error: "Movie not found"});
    }

    delete movies[id];
    res.json({message:"Movie deleted"})

}))


app.listen(port, () => {
    console.log("Server running at port: 3000")
});