# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "g0v"

  config.vm.box_url = "https://dl.dropboxusercontent.com/u/4339854/g0v/g0v-ubuntu-precise64.box"

  config.vm.network :forwarded_port, host: 5487, guest: 7777 
  config.berkshelf.enabled = true
  config.vm.provision :chef_solo do |chef|
    chef.add_recipe 'runit'
    chef.add_recipe 'znc'
  end
end
