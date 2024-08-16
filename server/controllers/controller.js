const { verifyPassword, generateToken } = require("../helpers");
const { User, Fleet, Route, City, Ticket } = require("../models");
var QRCode = require("qrcode");
const cloudinary = require("cloudinary").v2;
const midtransClient = require("midtrans-client");

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

class Controller {
  static testRoot(req, res, next) {
    res.json({ message: "Hello World" });
  }
  static async register(req, res, next) {
    try {
      const { fullName, email, password } = req.body;
      let newUser = await User.create({ fullName, email, password });
      res.json({ message: "success", data: newUser });
    } catch (error) {
      res.json({ error });
    }
  }
  static async login(req, res, next) {
    try {
      console.log(req.body);
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "LoginInfoRequired" };
      }
      let user = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw { name: "LoginInfoIncorrect" };
      }
      //   console.log(password, user.password);
      console.log(user);
      let isCorrect = verifyPassword(password, user.password);
      if (!isCorrect) {
        throw { name: "LoginInfoIncorrect" };
      }
      let accessToken = generateToken(user);
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }

  static async addRoute(req, res, next) {
    try {
      let { FromCityId, ToCityId, price, departTime, arrivalTime } = req.body;

      let newRoute = await Route.create({
        FromCityId,
        ToCityId,
        price,
        departTime,
        arrivalTime,
      });
      res.json({ message: "success", newRoute });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
  static async getAllRoutes(req, res, next) {
    try {
      let allRoute = await Route.findAll({
        include: ["From", "To"],
      });
      res.json(allRoute);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
  static async getRouteById(req, res, next) {
    try {
      let { id } = req.params;
      let allRoute = await Route.findByPk(id, {
        include: ["From", "To"],
      });
      res.json(allRoute);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
  static async createTicket(req, res, next) {
    try {
      const { FleetId } = req.body;
      let fleet = await Fleet.findByPk(FleetId, {
        include: {
          model: Route,
          include: ["From", "To"],
        },
      });
      console.log(fleet);

      let ticketCode = Math.floor(Math.random() * 9999) + 1000;
      let fromCode = fleet.Route.From.code;
      let toCode = fleet.Route.To.code;
      let ticketId = `${fromCode}-${toCode}-${req.user.id}-${ticketCode}`;

      let qrImg = await QRCode.toDataURL(ticketId);

      // console.log(qrImg);

      const result = await cloudinary.uploader.upload(qrImg, {
        folder: "TrapelKuh",
        public_id: ticketId,
        overwrite: true,
      });

      console.log(result.secure_url);

      let newTicket = await Ticket.create({
        price: fleet.Route.price,
        ticketId,
        status: "pending",
        qrUrl: result.secure_url,
        FleetId,
        UserId: req.user.id,
      });
      res.status(201).json({ newTicket });
      //   res.status(201).json({ message: "sukses" });
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
  static async getAllFleets(req, res, next) {
    try {
      let allFleet = await Fleet.findAll({
        include: {
          model: Route,
          include: ["From", "To"],
        },
      });
      res.json(allFleet);
    } catch (error) {
      res.json({ error });
    }
  }
  static async getTicketByUser(req, res, next) {
    try {
      let allTicket = await Ticket.findAll({
        where: {
          UserId: req.user.id,
        },
        include: {
          model: Fleet,
          include: {
            model: Route,
            include: ["From", "To"],
          },
        },
      });
      res.json(allTicket);
    } catch (error) {
      console.log(error);
      res.json({ error });
    }
  }
  static async updateTicket(req, res, next) {
    try {
      const { ticketId, status } = req.body;
      let ticket = await Ticket.findOne({
        where: {
          ticketId: ticketId,
        },
      });
      ticket.status = status;
      await ticket.save();
      res.json({ message: "success" });
    } catch (error) {
      console.log(error);
    }
  }

  static async handlePayment(req, res, next) {
    try {
      const { ticketId, price } = req.body;
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-TGNu7UK_wrgtwflSmHaFw0n5",
      });
      // console.log(snap,`-----------------------------`);
      // console.log(req.user, `-----------------------------------------------<`);

      let parameter = {
        //data detail order
        transaction_details: {
          order_id: ticketId + Math.random().toString(),
          gross_amount: price,
        },
        //data jenis pembayaran
        credit_card: {
          secure: true,
        },
        //data detail customer

        customer_details: {
          first_name: "testing",
          email: "testing@gmail.com",
          phone: "08111222333",
        },
      };

      const transaction = await snap.createTransaction(parameter);
      // console.log(transaction, `123-----------------------`);
      const transactionToken = transaction.token;

      res
        .status(200)
        .json({ message: "Order created", transactionToken, ticketId });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Controller;
