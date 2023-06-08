# Use React inside Laravel

---------------------------------------------------------------------------------------------------------------------------------------------

## Development
- Create **Laravel** app
```
composer create-project --prefer-dist laravel/laravel laravel-project
```

- Inside project create **React** app
```
cd laravel-project
npx create-react-app reactapp
```

- In **React** install all node libraries you need for react inside react project and use it as always

- **Fetch in React using http://127.0.0.1:8000/api as BASE_PATH**

- In **Laravel** go to routes/api.php and register all routes with controllers and methods
```
...
Route::group(['middleware' => 'cors'], function(){
    Route::get('/getallstates','App\Http\Controllers\StateController@getAll');
    Route::get('/getallusers','App\Http\Controllers\UserController@getAll');
    Route::get('/getbyiduser/{id}/','App\Http\Controllers\UserController@getById');
    Route::get('/getbyloginmail/{login}/{mail}/','App\Http\Controllers\UserController@getByLoginMail');
    Route::post('/insertuser','App\Http\Controllers\UserController@insert');
});
```


---------------------------------------------------------------------------------------------------------------------------------------------