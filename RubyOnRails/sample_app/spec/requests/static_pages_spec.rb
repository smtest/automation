require 'spec_helper'

describe "StaticPages" do
  describe "Home page" do
    before {visit root_path}
    it "should have the content 'Sample App'" do
      # Run the generator again with the --webrat flag if you want to use webrat methods/matchers
     
      expect(page).to have_content('Sample App')
    end
    
    it "should have the right title" do
 h
    expect(page).to have_title("Ruby on Rails Tutorial Sample App | Home")
  end
  end
  
  describe "Help page" do
    it "should have the content 'Help'" do
      visit help_path
      expect(page).to have_content('Help')
    end
  end
  
  describe "About page" do
    it "should have the content 'About Us'" do
      visit about_path
      expect(page).to have_content('About Us')
    end
  end
 

  
  it "should have the title 'About Us'" do
    visit about_path
    expect(page).to have_title("Ruby on Rails Tutorial Sample App | About Us")
  end
  
  describe "Contact page" do
    it "should have the content 'Contact'" do
      visit contact_path
      expect(page).to have_content('Contact')
    end
    
    it "should have the title 'Contact'" do
      visit contact_path
      expect(page).to have_title("Ruby on Rails Tutorial Sample App | Contact")
    end
  end
end
