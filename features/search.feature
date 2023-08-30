Feature: Booking ticket- Tests

	Scenario: Positive - Should book 1 seat
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "7" of the week
		When user chooses movie "2" and time "2"
		When user chooses seat "11" and "9"
		When user click on button 'Забронировать'
		When user click on button 'Получить код бронирования'
		Then user can see QR code
		Then user sees the header 'Электронный билет'

    Scenario: Positive - Should book 3 seat
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "7" of the week
		When user chooses movie "2" and time "2"
		When user chooses seat "7" and "8"
		When user chooses seat "4" and "5"
		When user chooses seat "6" and "7"
		When user click on button 'Забронировать'
		When user click on button 'Получить код бронирования'
		Then user can see QR code
		Then user sees the header 'Электронный билет'


	Scenario: Positive - Should book 2 seat
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "7" of the week
		When user chooses movie "2" and time "2"
		When user chooses seat "3" and "7"
		When user chooses seat "6" and "8"
		When user click on button 'Забронировать'
		When user click on button 'Получить код бронирования'
		Then user can see QR code
		Then user sees the header 'Электронный билет'

	Scenario: Negative - Should not book any seats
		Given user is on start page "http://qamid.tmweb.ru/client/index.php"
		When user chooses day "7" of the week
		When user chooses movie "2" and time "2"
		Then button 'Забронировать' not active