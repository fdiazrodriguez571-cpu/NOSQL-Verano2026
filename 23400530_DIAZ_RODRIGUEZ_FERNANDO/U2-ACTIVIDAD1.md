1. Mostrar todos los libros publicados después del año 2022.
db["libros"].find({año:{$gt:2022}})
2. Mostrar los usuarios cuya edad sea mayor o igual a 21 años.
db["usuarios"].find({edad:{$gte:21}})
3. Mostrar los libros con menos de 350 páginas.
db["libros"].find({paginas:{$lt:350}})
4. Mostrar los usuarios cuya edad sea menor o igual a 20 años.
db["usuarios"].find({edad:{$lte:20}})
5. Mostrar los libros cuya categoría sea diferente de "Programación".
db["libros"].find({categoria:{$ne:"Programacion"}})
6. Mostrar los usuarios que estudien Ingeniería Informática y estén en sexto semestre o superior.
db["usuarios"].find({$and:[{semestre:{$gt:6}},{carrera:"Ingenieria en Sistemas Computacionales"}]})
7. Mostrar los libros cuya categoría sea Programación o Bases de Datos.
db["libros"].find({$or:[{categoria:"Bases de Datos"},{categoria:"Programacion"}]})
8. Mostrar los préstamos que no han sido devueltos y cuya duración sea mayor a 8 días.
db["prestamos"].find({$and:[{devuelto:false},{diasPrestamo:{$gt:8}}]})
9. Mostrar los libros cuyo título empiece con la letra M.
db["libros"].find({titulo:/^M/})
10. Mostrar los usuarios cuyo nombre empiece con la letra A.
db["usuarios"].find({nombre:/^A/})
11. Mostrar los libros cuyo título contenga la palabra "Base".
db["libros"].find({titulo:/base/})
12. Mostrar únicamente el nombre y la carrera de todos los usuarios.
db["usuarios"].find({},{_id:0,nombre:1,carrera:1})
13. Mostrar únicamente el título y el autor de todos los libros.
db["libros"].find({},{_id:0,titulo:1,autor:1})
14. Mostrar únicamente el usuario y el libro de todos los préstamos.
db["prestamos"].find({},{_id:0,usuario:1,libro:1})
15. Mostrar los libros ordenados por año de publicación, del más reciente al más antiguo.
db["libros"].find({}).sort({año:-1})
16. Mostrar los usuarios ordenados alfabéticamente por nombre.
db["usuarios"].find({}).sort({nombre:1})
17. Mostrar los préstamos ordenados por la cantidad de días de préstamo, del mayor al menor.
db["prestamos"].find().sort({diasPrestamo:-1})
18. Mostrar únicamente el título y el año de los libros publicados a partir de 2022, ordenados del más reciente al más
antiguo.
db["libros"].find({año:{$gte:2022}},{_id:0,titulo:1,año:1}).sort({año:-1})
19. Mostrar el nombre y la carrera de los usuarios cuya carrera sea Ingeniería en Sistemas Computacionales o
Ingeniería Informática.
db["usuarios"].find({$or:[{carrera:"Ingenieria en Sistemas Computacionales"},{carrera:"Ingenieria Informatica"}]},{_id:0,nombre:1,carrera:1})
20. Mostrar los préstamos no devueltos, ordenados por la cantidad de días de préstamo de mayor a menor, mostrando
únicamente el usuario, el libro y los días de préstamo.
db["prestamos"].find({devuelto:false},{_id:0,usuario:1,libro:1,diasPrestamo:1}).sort({diasPrestamo:-1})
