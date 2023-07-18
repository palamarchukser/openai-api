<?php
require __DIR__ . '/vendor/autoload.php';

use Orhanerday\OpenAi\OpenAi;

$content = $_GET['content'];

if ($content) {
    $open_ai = new OpenAi('sk-...');

    $chat = $open_ai->chat([
        'model' => 'gpt-3.5-turbo',
        'messages' => [
            [
                "role" => "assistant",
                "content" => $content
            ],
        ],
        'temperature' => 0.2,
        'max_tokens' => 4000,
        'frequency_penalty' => 0,
        'presence_penalty' => 0,
    ]);

    $d = json_decode($chat);

    return $d->choices[0]->message->content;
}

return 'Missing content parameter';
