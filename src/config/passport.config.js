import passport from "passport";
import local from 'passport-local';
import userService from '../../models/Users.js'

const localStrategy = local.Strategy; /// en local utilizo username + password