#!/usr/bin/env node

var program = require('commander');
var exec = require('child_process').exec;
var crypto = require('crypto');
var fs = require('fs'),
    filename = '/etc/znc/configs/znc.conf';

var CreateZncUser = function (user, password, realname, callback) {

  if ( user != undefined && password != undefined && user.match(/^[a-zA-Z]/)) {
    var data = fs.readFileSync(filename, 'utf-8');
    if( data.match('<User '+user+'>') ) {
      console.log('User '+user+' exists');
    } else { 
      var salt = crypto.randomBytes(16).toString('hex');
      var hash_password = crypto.createHash('sha256').update(password+salt).digest('hex');
        data ='\n<User '+user+'>\n\
        Pass = sha256#'+hash_password+'#'+salt+'#\n\
        Nick = '+user+'\n\
        AltNick = '+user+'_\n\
        Ident = '+user+'\n\
        RealName = '+realname+'\n\
        QuitMsg = ZNC - http://znc.in\n\
        StatusPrefix = *\n\
        Buffer = 0\n\
        KeepBuffer = true\n\
        MultiClients = true\n\
        DenyLoadMod = false\n\
        Admin = false\n\
        DenySetBindHost = false\n\
        TimestampFormat = [%H:%M:%S]\n\
        AppendTimestamp = false\n\
        PrependTimestamp = false\n\
        TimezoneOffset = 0.00\n\
        JoinTries = 0\n\
        MaxJoins = 0\n\
        IRCConnectEnabled = true\n\
        Server = irc.freenode.net 6667\n\
        Allow = *\n\
</User>\n';
      fs.appendFileSync(filename, data);
      exec('sv restart znc');
      console.log('User '+user+' created');
    }
  } else {
    console.log('User foramt error');
  }
  callback(); 
};

if(require.main == module) {
  console.error('Invoked at command line.');
  if (process.getuid() != 0 ) {
    console.log('Please Run as Root with NODE_PATH=/usr/lib/node_modules');
    process.exit(1);
  }
  if(process.argv.length > 2 ) {
    program
      .version('0.0.1')
      .option('-u, --user <string>', 'Add User')
      .option('-p, --password <string>', 'User Password (must include -u)') 
      .parse(process.argv);
    if(program.user && program.password) {
      console.log('Under Construction');
    }
  } else {
    program.prompt('User(Nick): ', function (user) {
      program.password('Password: ', '*', function (password) {
        program.prompt('RealName: ', function (realname) {
          CreateZncUser(user, password, realname, function () {
            process.exit(1);
          });
        });
      });
    });
  }

} else {
  console.error('Invoked via library call');
}

exports.CreateZncUser = CreateZncUser;
