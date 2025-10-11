<?php

it('loads landing page', function () {
    $response = $this->get('/');
    $response->assertStatus(200);
});
