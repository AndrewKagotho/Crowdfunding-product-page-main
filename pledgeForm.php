<?php
	$file = 'CDFdata.json';

	if(!file_exists($file)){

		if ($_SERVER['REQUEST_METHOD'] == 'POST') {
			// Initializing pledges, backers, days
            $backers = 1;
            $days = 56;
			$noReward = 0;
			$bamboo = 0;
			$bambooLeft = 120;
			$black = 0;
			$blackLeft = 75;
			$mahogany = 0;
			$mahoganyLeft = 3;

			// Updating values based on first pledge
			$firstPledge = $_POST['label'];
			if($firstPledge == 'Bamboo Stand'){
				$bamboo += 1;
				$bambooLeft -= 1;
			}
			else if($firstPledge == 'Black Edition Stand'){
				$black += 1;
				$blackLeft -= 1;
			}
			else if($firstPledge == 'Mahogany Special Edition'){
				$mahogany += 1;
				$mahoganyLeft -= 1;
			}

			$objectData = newFileData($backers, $days, $noReward, $bamboo, 
			$bambooLeft, $black, $blackLeft, $mahogany, $mahoganyLeft);

			// Creating JSON file and populating with initial data
			if(file_put_contents("$file", $objectData))
				header('location: index.html');
			else
				echo 'Error';
		}
	}
	else{
		// Calculating and returning ID for new pledge
		$userID = readJSONData($file);
		
		// Appending new pledge details to existing file
		$writeData = fopen($file, 'a+') or die ('Unable to open');
		$sizeOfFile = filesize($file)-4;
		ftruncate($writeData, $sizeOfFile);		// Removing closing brackets to append pledge details into JSON
		fwrite($writeData, addJSONData($file, $userID));	// Returning string with pledge details and closing brackets to write
		fclose($writeData);

		// Updating values based on new pledge in JSON file
		updateJSONData($file, $userID);

		header('location: index.html');
	}

	// Updating values for total amount and backers with each new pledge
	if($backers!=1){
        $fileContents = file_get_contents($file);
        $arrayData = json_decode($fileContents, true);
		$arrayData['Database'][0]['Total'] += $_POST['amount'];
        $arrayData['Database'][0]['Backers'] += 1;
        $fileContents = json_encode($arrayData);
        file_put_contents($file, $fileContents);
    }

	// Fetching data from submitted form
	function getFormData($backers){
		$formData[] = array(
			'ID' => $backers,
            'Pledge' => $_POST['label'],
            'Amount' => (int)$_POST['amount']
        );
		return $formData;
	}

	// Creating array with form data and other key-value pairs
    function indexData($backers, $days, $noReward, $bamboo, 
	$bambooLeft, $black, $blackLeft, $mahogany, $mahoganyLeft){
		$info[] = array(
            'Total' => $_POST['amount'],
            'Backers' => $backers,
            'Days' => $days,
			'Pledges with no reward' => $noReward,
			'Bamboo Stands Pledged' => $bamboo,
			'Black Edition Stands Pledged' => $black,
			'Mahogany Special Editions Pledged' => $mahogany,
			'Bamboo Stands Left' => $bambooLeft,
			'Black Edition Stands Left' => $blackLeft,
			'Mahogany Special Editions Left' => $mahoganyLeft,
            'Records' => getFormData($backers)
        );
		return $info;
	}

	// Creating object with nested array
    function newFileData($backers, $days, $noReward, $bamboo, 
	$bambooLeft, $black, $blackLeft, $mahogany, $mahoganyLeft){
        $object = array("Database" => indexData($backers, $days, $noReward, $bamboo, 
		$bambooLeft, $black, $blackLeft, $mahogany, $mahoganyLeft));
		return json_encode($object);
    }
	
	// Calculating and returning ID for new pledge
	function readJSONData($file){
		$JSONContent = file_get_contents($file);
        $JSONArray = json_decode($JSONContent, true);
        $userID = $JSONArray['Database'][0]['Backers'] += 1;
		return $userID;
	}

	// Creating, returning string with new pledge details and closing brackets to append to JSON file
	function addJSONData($file, $userID){
		$formString = ',{"ID":' . $userID . ',"Pledge":"'. $_POST['label'] . '","Amount":' . $_POST['amount'] . '}]}]}';
		return $formString;
	}

	// Updating values based on new pledge in JSON file
	function updateJSONData($file, $userID){
		$addedJSONContent = file_get_contents($file);
        $addedJSONArray = json_decode($addedJSONContent, true);
        $pledge = $addedJSONArray['Database'][0]['Records'][$userID-1]['Pledge'];
		
		if($pledge == 'Pledge with no reward')
			$addedJSONArray['Database'][0]['Pledges with no reward'] += 1;
		else if($pledge == 'Bamboo Stand'){
			$addedJSONArray['Database'][0]['Bamboo Stands Pledged'] += 1;
			$addedJSONArray['Database'][0]['Bamboo Stands Left'] -= 1;
		}
		else if($pledge == 'Black Edition Stand'){
			$addedJSONArray['Database'][0]['Black Edition Stands Pledged'] += 1;
			$addedJSONArray['Database'][0]['Black Edition Stands Left'] -= 1;
		}
		else if($pledge == 'Mahogany Special Edition'){
			$addedJSONArray['Database'][0]['Mahogany Special Editions Pledged'] += 1;
			$addedJSONArray['Database'][0]['Mahogany Special Editions Left'] -= 1;
		}

		$addedJSONContent = json_encode($addedJSONArray);
		file_put_contents($file, $addedJSONContent);
	}
	
?>