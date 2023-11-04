import { User } from "../models/user.js";

export function getUserByEmail(request) {
  return User.findOne({
    email: request.body.email,
  });
}

export function getUserByActivationToken(request) {
  return User.findOne({
    activationToken: request.params.activationToken,
  });
}

export function getUserByRandomString(request) {
  return User.findOne({
    randomString: request.params.randomString,
  });
}
