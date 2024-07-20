import '@styles/globals.css';
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
    title: 'Promptopia',
    description: 'Discover and share AI Prompts'
}

const RootLayout = ({children}) => {
  return (
      <html lang='en'>
        <body>
        <Provider>
        <div class="area">
			<ul class="circles">
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
		</div>
            <main className='app'>
                <Nav/>
                {children}
            </main>
        </Provider>
        </body>
      
    </html>
  )
}

export default RootLayout;