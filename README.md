# Floor Plan Block

Floor Plans is a Airtable integrated React Application for managing Workary Sites, Desks and Clients locations.

## Development Setup

Retrieve your Airtable API Key from Settings < Accounts.

Use the package manager [npm](https://www.npmjs.com) to install.
```bash
# Installs all dependencies in node_modules
npm install

# Set up the Airtable Block Client
npm run b:setup $your_key_here

# Run the development server on https://localhost:9000
npm run block

# Releases the App onto Airtable (this is different from publishing it on the market)
npm run b:release
```

### Remote Development 

If Developing on a remote block you will need to attach a remote branch to it so you can connect to it. ( Or you can create your own dev version of the app )

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
