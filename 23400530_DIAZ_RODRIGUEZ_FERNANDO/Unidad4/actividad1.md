Crea el flujo e interaccion  Cliente-servidor para un CRUD Basico de una tienda de peliculas 
 1. Crear a una pelicula ---metodo post 
 2. Consulta una pelicula por su id --metodo get 
 3. Actualiza el año , director y duracion de una pelicula por su id  -- update 
 4. Borra una pelicula por su id  --delete 


 1.-Crear una pelicula 
-- Para esto se usa el metodo post ya que los otros pueden

--se envia al servidor
Metodo http: Post
url: /peliculas/

 {
"Id": 1,
"Nombre": "The end of evangelion",
"director":"Hideakki Anno",
"año":1997,
"duracion":87,
"genero":"Drama Psicologico"
 }


-- Manda al cliente 

{
"code":200,
año:"Pelicula insertada"


}



 2. Obtener Pelicula  
-- Para esto se usa el metodo get 

--se envia al servidor
Metodo http:Get
url: /peliculas/1
se manda al servidor
{}


recibe el cliente:
 {
"Id": 1,
"Nombre": "The end of evangelion",
"director":"Hideakki Anno",
"año":1997,
"duracion":87,
"genero":"Drama Psicologico"
 }

  3. Actualiza el año , director y duracion de una pelicula por su id  -- update

  Metodo http: Put
  url: /pelicula/1

 
  json enviado 
  {
"año":2024,
"duracion":120, 
  } 


json recibido 
{
    "code":200
    "msg":"producto actualizado"
}


 4. Borra una pelicula por su id  --delete 
Metodo http: delete
  url: /pelicula/1

 
json enviado 
{}


json recibido 
{
    "code":200
    "msg":"producto eliminado"
}
