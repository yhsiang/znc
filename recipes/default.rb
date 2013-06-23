#
# Cookbook Name:: znc
# Recipe:: default
#
# Copyright 2013, Yuan Hsiang Cheng
#
# All rights reserved - Do Not Redistribute
#
package "znc"

user node['znc']['user']
group node['znc']['group']

[ node['znc']['data_dir'],
  node['znc']['conf_dir'],
  node['znc']['module_dir'],
  node['znc']['users_dir']
].each do |dir|
  directory dir do
    owner node['znc']['user']
    group node['znc']['group']
  end
end

bash "generate-pem" do
  cwd node['znc']['data_dir']
  code <<-EOH
    znc -d #{node['znc']['data_dir']} -p
  EOH
  user node['znc']['user']
  group node['znc']['group']
  creates "#{node['znc']['data_dir']}/znc.pem"
end

template "#{node['znc']['data_dir']}/configs/znc.conf" do
  source "znc.conf.erb"
  mode 0600
  owner node['znc']['user']
  group node['znc']['group']
end

runit_service "znc" do
  owner node['znc']['user']
  group node['znc']['group']
  default_logger true
end
