# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  config.vm.box = "debian/jessie64"  

  config.vm.network "forwarded_port", guest: 8080, host: 8080, host_ip: "127.0.0.1"
  config.vm.network "forwarded_port", guest: 27017, host: 27017, host_ip: "127.0.0.1"

  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine using a specific IP.
  config.vm.network "private_network", ip: "192.168.1.10"

  #config.vm.network "public_network"

  config.vm.synced_folder ".", "/vagrant"

  config.vm.provider "virtualbox" do |vb|
  #   # Display the VirtualBox GUI when booting the machine
  #   vb.gui = true
  #
  #   # Customize the amount of memory on the VM:
      vb.memory = "2560"
  end
  
  # Disable swap
  config.vm.provision "shell", inline: "swapoff -a"
  # Disable swap permanently 
  $script = <<-'SCRIPT'
    swapoff -a
    sed -i.bak '/ swap / s/^\(.*\)$/#\1/g' /etc/fstab
  SCRIPT
  
  config.vm.provision "shell", inline: $script

  #Primeira Vez
  config.vm.provision :shell, privileged: true, path: "configEnv.sh"

  #Sempre ao Iniciar
  config.vm.provision :shell, privileged: true, run: "always", path: "startEnv.sh"

end
