const client = require('./client')

async function test(){


	console.log('requestMarketBuy')
	const orderResponse = await client.requestMarketBuy('KRW-BTC', '4900')
	console.log(orderResponse)

	console.log('getOrderStatus')
	const orderStatus = await client.getOrderStatus('6830700e-9f2b-4216-99be-aaaaaaaa')
	console.log(orderStatus)

}

test()