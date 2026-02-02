terraform {
  backend "s3" {
    bucket         = "devops-s3-saqib"
    key            = "dev/terraform.tfstate"
    region         = "me-south-1"
    dynamodb_table = "saqibdevops"
    encrypt        = true
  }
}
