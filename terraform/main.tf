provider "aws" {
  region = var.region
}

resource "aws_instance" "firstec2" {
  count = 3
  ami = var.ec2_ami
  instance_type = var.ec2_family
  key_name = var.key_name
  subnet_id = var.public_subnet
  vpc_security_group_ids = [ var.myip_sg, var.WebAccess_sg, var.RemoteAccess_sg ]

  associate_public_ip_address = true

  user_data = <<-EOF
  #!/bin/bash
  apt update -y
  apt install -y docker.io
  systemctl start docker
  systemctl enable docker
  usermod -aG docker ubuntu
  docker run -d -p 80:80 nginx
  apt upgrade -y
  EOF


  tags = {
    Name = "${var.env}-webserver"
  }
}
