import userModel from "../models/user.model.js";
import emailVerificationTokenModel from "../models/emailVerificationToken.model.js";
import { sendEmailVerificationToken } from "../utils/email.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

const signup = async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    const checkUser = await userModel.findOne({ email });

    if (checkUser)
      return responseHandler.badrequest(
        res,
        "An account with this email already exists"
      );

    const user = new userModel();

    user.displayName = displayName;
    user.email = email;
    user.setPassword(password);

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel
      .findOne({ email })
      .select("email password salt id displayName");

    if (!user) return responseHandler.badrequest(res, "User not exist");

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong password");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      { expiresIn: "24h" }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

//****** test */
const requestEmailVerification = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select("email verified");

    if (!user) return responseHandler.unauthorize(res);

    const checkVerified = await userModel.findOne({ verified });

    if (checkVerified)
      return responseHandler.badrequest(
        res,
        "Your account is already verified"
      );

    const verificationCode = crypto.randomInt(100000, 999999).toString();

    const emailVerificationToken = new emailVerificationTokenModel();

    emailVerificationToken.user = user;
    emailVerificationToken.verificationToken = verificationCode;

    await emailVerificationToken.save();

    await sendEmailVerificationToken(user.email, verificationCode);

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.body
    
    const emailVerificationToken = await emailVerificationTokenModel.findOne({ verificationToken })
    
    if (!emailVerificationToken) return responseHandler.badrequest("Your verification token is either wrong or expired")

  } catch {
    responseHandler.error(res);
  }
}
//****** test */

const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select("password id salt");

    if (!user) return responseHandler.unauthorize(res);

    if (!user.validPassword(password))
      return responseHandler.badrequest(res, "Wrong password");

    user.setPassword(newPassword);

    await user.save();

    responseHandler.ok(res);
  } catch {
    responseHandler.error(res);
  }
};

const getInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);

    if (!user) return responseHandler.notfound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export default {
  signup,
  signin,
  getInfo,
  updatePassword,
  requestEmailVerification,
};
