const { Client } = require("../models/entities");

var num_client;

const loginControl = (request, response) => {
  const clientServices = require("../services/clientServices");

  let username = request.body.username;
  let password = request.body.password;
  if (!username || !password) {
    response.render("login_result", {
      message:
        "Login failed! It would help if you entered both a username and password!"
    });
    response.end();
  } else {
    if (request.session && request.session.user) {
      response.render("login_result", {
        message: "Woah there partner! You're already logged in!"
      });
      response.end();
    } else {
      clientServices.loginService(username, password, function (
        err,
        dberr,
        client
      ) {
        console.log("Client from login service :" + JSON.stringify(client));
        if (client === null) {
          console.log("Auhtentication problem!");
          response.render("login_result", {
            message:
              "Log in failed! We don't have such details in the database. Join us and register!"
          });
          response.end();
        } else {
          console.log("User from login service :" + client[0].num_client);
          //add to session
          request.session.user = username;
          num_client = client[0].num_client;
          request.session.admin = client[0].num_client === 66;
          response.render("login_result", {
            message: `Login (${username}, ID.${client[0].num_client}) successful!`
          });
          response.end();
        }
      });
    }
  }
};

const registerControl = (request, response) => {
  const clientServices = require("../services/clientServices");

  let username = request.body.username;
  let password = request.body.password;
  let society = request.body.society;
  let contact = request.body.contact;
  let addres = request.body.addres;
  let zipcode = request.body.zipcode;
  let city = request.body.city;
  let phone = request.body.phone;
  let fax = request.body.fax;
  let max_outstanding = request.body.max_outstanding;
  let client = new Client(
    username,
    password,
    0,
    society,
    contact,
    addres,
    zipcode,
    city,
    phone,
    fax,
    max_outstanding
  );

  clientServices.registerService(client, function (err, exists, insertedID) {
    console.log("User from register service :" + insertedID);
    if (exists) {
      console.log("Username taken!");
      response.render("register_result", {
        message: `Registration failed. The username (${username}) is already taken!`
      });
    } else {
      client.num_client = insertedID;
      console.log(`Registration (${username}, ${insertedID}) successful!`);
      response.render("register_result", {
        message: `Successful registration ${client.contact} (ID.${client.num_client})!`
      });
    }
    response.end();
  });
};

const getClients = (request, response) => {
  const clientServices = require("../services/clientServices");
  if (request.session.admin) {
    console.log("ADMIN!");
    clientServices.searchService(function (err, rows) {
      response.render("clients", { clients: rows });
      console.log(request.session.num_client);
    });
  } else {
    console.log("NOT ADMIN!");
    if (typeof num_client !== "undefined") {
      console.log("NOT ADMIN!");
      clientServices.searchNumClientService(num_client, function (err, rows) {
        response.render("person", { clientus: rows });
      });
    } else {
      console.log(num_client);
      response.render("notloggedin");
    }
  }
};

const getClientByNumClient = (request, response) => {
  const clientServices = require("../services/clientServices");
  let client_num = request.params.num_client;
  clientServices.searchNumClientService(client_num, function (err, rows) {
    response.render("person", { clientus: rows });
  });
};

module.exports = {
  loginControl,
  registerControl,
  getClients,
  getClientByNumClient
};
