Collection
==========
A desktop software for indexing and displaying media.


Features
==========
the following media types are supported:
* Music (mp3, m4a, aac, wav, wma)
* Ebooks (epub, mobi, pdf)
	* Related files are based on name of files. 
	* This includes other versions of the ebook,opf and cover images)
* Movies (avi, dat, divx, wmv)
	* Related files are based on folder files

Its very easy to add a file format to be supported from code end

Technology:
============
* Node
* MongoDB
* Mongoose(node module)

Current milestone:
===================
Grabs following data and store in mongoDB database:
* Music
* Ebooks
* Movies
Display these media over a webserver

Todo:
===============
* Intigrate web server into a single node-webkit app
* Movie information/reviews through IMDB, rotten tomatoes
* Parse OPFs for ebooks
* Ebook infomation/reviews through goodreads
* Parse ID3 tags on music files

Future:
=========
Planning for a full desktop software with node-webkit inteface. The application can be bundled and used on multiple platforms
