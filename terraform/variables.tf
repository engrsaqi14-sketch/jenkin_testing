  variable "env" {
  type = string
}

variable "region" {
  description = "Region for project"
  type        = string
  default     = "me-south-1"
}

variable "ec2_ami" {
  type = string
}

variable "ec2_family" {
  type = string
}

variable "public_subnet" {
  type = string
}

variable "WebAccess_sg" {
  type =string
}

variable "RemoteAccess_sg" {
  type = string
}

variable "myip_sg" {
  type = string
}
